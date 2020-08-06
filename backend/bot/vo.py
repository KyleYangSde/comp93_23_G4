from enum import Enum
import json


class ContentType(Enum):
    Text = 'Text'
    Link = 'Link'
    Photo = 'Photo'
    Label = 'Label'
    # Html = 'Html'
    # LinkVideo = 'LinkVideo'
    # LinkArticle = 'LinkArticle'
    # LinkPhoto = 'LinkPhoto'


class Code(Enum):
    Success = 'Success'
    SystemErr = 'SystemErr'
    ValidateErr = 'ValidateErr'


class AnswerType(Enum):
    Local = 'local'
    Api = 'api'


class Utterance:
    def __init__(self, session_id, expression):
        self.session_id = session_id
        self.expression = expression


class IntentMore:
    def __init__(self, intent, offset):
        self.intent = intent
        self.offset = offset


class ApiResponse:
    def __init__(self, session_id, answer, code=0, error_message=''):
        self.code = code
        self.error_message = error_message
        self.session_id = session_id
        self.answer = answer

    def repr_json(self):
        return dict(code=self.code, error_message=self.error_message, session_id=self.session_id, answer=self.answer)


class Answer:
    def __init__(self, intent, reply="", bot_api="", contents=[], more=False, offset=0, parameter=None):

        self.intent = intent
        self.reply = reply
        self.bot_api = bot_api
        self.contents = contents
        self.more = more
        self.offset = offset
        self.parameter = parameter

    def repr_json(self):
        return dict(intent=self.intent, reply=self.reply, bot_api=self.bot_api, contents=self.contents, more=self.more,
                    offset=self.offset, parameter=self.parameter)


class Content:
    def __init__(self, content, content_type=ContentType.Text.value, title=""):
        self.content_type = content_type
        self.title = title
        self.content = content

    def repr_json(self):
        return dict(content=self.content, content_type=self.content_type, title=self.title)


class DialogFLowResponse:
    def __init__(self, query_text, intent_name, entities, fulfillment_text, bot_api):
        self.query_text = query_text
        self.intent_name = intent_name
        self.entities = entities
        self.fulfillment_text = fulfillment_text
        self.bot_api = bot_api


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, 'repr_json'):
            return obj.repr_json()
        else:
            return json.JSONEncoder.default(self, obj)
