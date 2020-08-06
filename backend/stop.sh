#!/bin/sh

kill $(ps -ef|grep flask | grep chatbot | head -1 | awk '{print $2}')
