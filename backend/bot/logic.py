import json
import uuid
from bot.dao import query_intent, add_conversation, add_session_log, query_session_log
from bot.dialogFlow import detect_intent_texts
from bot.entity import SessionLog
from bot.vo import Answer, Content, AnswerType, ContentType, ComplexEncoder

FETCH_SIZE = 4


def reply(utterance_dict):
    session_id = utterance_dict.get('session_id')
    if session_id is None or len(session_id) == 0:
        session_id = str(uuid.uuid4())
        add_conversation(session_id)
        utterance_dict['session_id'] = session_id

    expression = utterance_dict['expression']
    df_response = detect_intent_texts(session_id, expression)
    intent_name = df_response.intent_name
    params = df_response.entities
    fulfillment_text = df_response.fulfillment_text
    bot_api = df_response.bot_api

    # intent matching
    intent_obj = query_intent(intent_name)
    if intent_obj is None:
        answer = Answer(intent_name, fulfillment_text, bot_api)
        create_session_log(session_id, expression, answer)
        return answer

    intent_id = intent_obj.id
    intent_name = intent_obj.intent
    entity_string = intent_obj.entities
    contents = intent_obj.contents
    if entity_string is not None and len(entity_string) > 0:
        entity_define = json.loads(entity_string)
        for entity_name, labels in entity_define.items():
            param_value = params[entity_name]
            if not param_value:
                contents = list()
                for label in labels:
                    content = Content(label, ContentType.Label.value)
                    contents.append(content)
                answer = Answer(intent_name, fulfillment_text, bot_api, contents)
                create_session_log(session_id, expression, answer, intent_id)
                return answer

    contents = filter_contents(contents, params)
    answer_type = intent_obj.answer_type
    api_name = intent_obj.api_name
    if answer_type == AnswerType.Local.value:
        return fetch_contents(session_id, expression, intent_id, contents, intent_name, 0, json.dumps(params), fulfillment_text, bot_api)


def answer_more(session_id):
    session_log = query_session_log(session_id)
    answer_dict = json.loads(session_log.answer)
    intent_name = answer_dict['intent']
    offset = answer_dict['offset']
    parameter = answer_dict['parameter']

    intent_obj = query_intent(intent_name)
    if intent_obj is None:
        return None

    answer_type = intent_obj.answer_type
    api_name = intent_obj.api_name
    if answer_type == AnswerType.Local.value:
        contents = intent_obj.contents
        if parameter:
            contents = filter_contents(contents, json.loads(parameter))
        return fetch_contents(session_id, 'more', intent_obj.id, contents, intent_obj.intent, offset)


def filter_contents(contents, params):
    contents_filter = list()
    for c in contents:
        found = True
        for param in params.values():
            p = param.lower()
            label = c['label'].lower()
            if p not in label:
                found = False
                break
        if found:
            contents_filter.append(c)
    return contents_filter


def fetch_contents(session_id, expression, intent_id, contents, intent_name, offset, parameter=None, reply_text='', bot_api=''):
    end_idx = offset + FETCH_SIZE
    arr_len = len(contents)
    if arr_len > end_idx:
        more = True
    else:
        more = False
        end_idx = arr_len

    contents = contents[offset:end_idx]
    contents_fetched = list()
    for c in contents:
        content = Content(c.get('content'), c.get('type'), c.get('title'))
        contents_fetched.append(content)
    answer = Answer(intent_name, reply_text, bot_api, contents_fetched, more, end_idx, parameter)
    create_session_log(session_id, expression, answer, intent_id)
    return answer


def create_session_log(session_id, expression, answer, intent_id=None):
    answer_json = json.dumps(answer.repr_json(), cls=ComplexEncoder)
    print(answer_json)
    log = SessionLog(
        session_id=session_id,
        expression=expression,
        intent_id=intent_id,
        answer=answer_json
    )
    add_session_log(log)
