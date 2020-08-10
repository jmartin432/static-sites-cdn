import logging


logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    logger.info('Received event: {event}'.format(event=event))

    request = event['Records'][0]['cf']['request']
    host = request['headers']['host'][0]['value']

    logger.info('Adding Custom Header: x-forwarded-host: {host}'.format(host=host))

    request['headers']['x-forwarded-host'] = [{
        'key': 'X-Forwarded-Host',
        'value': host
    }]
    logger.info('Updated request to: {request}'.format(request=request))

    return request