import boto3
import time
import logging
import json
from string import Template
import os
import datetime

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    logger.info(event)
    client = boto3.client('lambda')
    response1 = client.list_versions_by_fuction(
        FunctionName='static-sites-cdn-dev-origin-router'
    )
    logger.info('Response1: ', response1)
    response2 = client.list_versions_by_fuction(
        FunctionName='static-sites-cdn-dev-custom-headers'
    )
    logger.info('Response2: ', response2)


    return
