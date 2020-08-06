#!/bin/bash

. venv/bin/activate

export FLASK_APP=bot
export FLASK_ENV=development
export GOOGLE_APPLICATION_CREDENTIALS=./chatbot-flrghd-5abd554d60f2.json

flask run --port=8080
