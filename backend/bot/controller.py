from flask import jsonify
from flask import request
from bot import app
from bot.logic import reply, answer_more
from bot.vo import ApiResponse, ComplexEncoder

app.json_encoder = ComplexEncoder


@app.route("/utterance", methods=['POST'])
def utterance():

    utterance_dict = request.get_json()
    print("Request body: \n%s" % utterance_dict)

    answer = reply(utterance_dict)
    response = ApiResponse(utterance_dict['session_id'], answer)
    return jsonify(response.repr_json())


@app.route("/more/<session_id>", methods=['GET'])
def more(session_id):

    answer = answer_more(session_id)
    response = ApiResponse(session_id, answer)
    return jsonify(response.repr_json())
