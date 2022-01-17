import logging
import base64
import json

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    logger.info('Received event: {event}'.format(event=json.dumps(event)))

    request = event['Records'][0]['cf']['request']
    host = request['headers']['host'][0]['value']

    if '-dev' in host:
        logger.info('Received dev request, checking authorization for dev site')
        basic_auth = 'Basic ZGV2OmRldg=='  # dev:dev encoded in base64
        response = {
            'status': '401',
            'statusDescription': 'Unauthorized',
            'body': 'You are not authorized to enter',
            'headers': {
                'www-authenticate': [{'key': 'WWW-Authenticate', 'value': 'Basic'}]
            },
        }
        if 'authorization' not in request['headers'].keys():
            logger.info('Authorization expected: {expected_auth}, received: NONE'
                        .format(expected_auth=basic_auth))
            logger.info('No authorization header, returning response: {response}'.format(response=json.dumps(response)))
            return response
        elif request['headers']['authorization'][0]['value'] != basic_auth:
            logger.info(request['headers']['authorization'][0])
            logger.info('Authorization expected: {expected_auth}, received: {received_auth}'
                        .format(expected_auth=basic_auth, received_auth=request['headers']['authorization'][0]['value']))
            logger.info('Authorization did not match, returning response: {response}'
                        .format(response=json.dumps(response)))
            return response
        else:
            logger.info('Authorization expected: {expected_auth}, received: {received_auth}'
                        .format(expected_auth=basic_auth, received_auth=request['headers']['authorization'][0]['value']))
            logger.info('Authorization matched, continuing with request')

    logger.info('Adding Custom Header: x-forwarded-host: {host}'.format(host=host))

    request['headers']['x-forwarded-host'] = [{
        'key': 'X-Forwarded-Host',
        'value': host
    }]
    logger.info('Updated request to: {request}'.format(request=json.dumps(request)))

    return request
