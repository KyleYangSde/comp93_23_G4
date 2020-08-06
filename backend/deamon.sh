#!/bin/bash

. venv/bin/activate

export FLASK_APP=bot
export FLASK_ENV=development
export GOOGLE_APPLICATION_CREDENTIALS=./chatbot-flrghd-5abd554d60f2.json

rm -rf bot/__pycache__

nohup flask run --host=0.0.0.0 --port=8080 &
#flask run --host=0.0.0.0 --port=8080
