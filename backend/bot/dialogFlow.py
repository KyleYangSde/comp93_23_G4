import dialogflow_v2 as dialog_flow
import json
from bot.vo import DialogFLowResponse


def detect_intent_texts(session_id, expression, language_code='en_US', project_id='chatbot-flrghd'):

    """Returns the result of detect intent with texts as inputs.

    Using the same `session_id` between requests allows continuation
    of the conversation."""
    session_client = dialog_flow.SessionsClient()

    session = session_client.session_path(project_id, session_id)

    text_input = dialog_flow.types.TextInput(
        text=expression, language_code=language_code)

    query_input = dialog_flow.types.QueryInput(text=text_input)

    response = session_client.detect_intent(
        session=session, query_input=query_input)

    print('=' * 20)
    query_result = response.query_result

    print("QueryResult: \n%s" % query_result)
    result_json = to_json(query_result)
    print('=' * 20)
    print("Bot_api: \n%s" % result_json)
    return DialogFLowResponse(query_result.query_text, query_result.intent.display_name,
                              to_json_parameters(query_result.parameters), query_result.fulfillment_text, result_json)


def to_json(query_result):
    params = to_json_parameters(query_result.parameters)
    messages = to_json_fulfillment_messages(query_result.fulfillment_messages)
    a = \
        {
            "queryText": query_result.query_text,
            "parameters": params,
            "allRequiredParamsPresent": query_result.all_required_params_present,
            "fulfillmentText": query_result.fulfillment_text,
            "fulfillmentMessages": messages,
            "intent": {
                "display_name": query_result.intent.display_name
            }
        }
    s = json.dumps(a)
    return s


def to_json_fulfillment_messages(fulfillment_messages):
    messages = list()
    for m in fulfillment_messages:
        text = to_json_text(m)
        if text is not None:
            messages.append(text)
        cards = to_json_payload(m, "cards")
        if cards is not None:
            messages.append(cards)
        quick_replies = to_json_payload(m, "quick_replies")
        if quick_replies is not None:
            messages.append(quick_replies)
    return messages


def to_json_text(m):
    if len(m.text.text) == 0:
        return
    a = {
        "text": {
            "text": list(m.text.text)
        }
    }
    return a


def to_json_payload(m, name):
    p = m.payload
    if len(p) == 0:
        return
    c = m.payload.fields[name].list_value.values
    lists = list()
    if len(c) == 0:
        return
    for e in c:
        f = e.struct_value.fields
        g = dict()
        for k, v in f.items():
            g[k] = v.string_value
        lists.append(g)
    r = dict()
    r[name] = lists

    d = m.payload.fields['text'].string_value
    if len(d) > 0:
        r['text'] = d
    a = {
        "payload": r
    }
    return a


def to_json_parameters(parameters):
    a = parameters.fields
    r = dict()
    for k, v in a.items():
        r[k] = v.string_value
    return r

