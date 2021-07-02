import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    # test comment
    logger.info('Received event: {event}'.format(event=event))

    keys_list = [
        'www',
        'justinlmartin',
        'coding-portfolio',
        'qr',
        'landing-page',
        'test-site',
        'peaks-valleys',
        'creative-coding',
        'spaceblobman',
        'sunrise-sunset',
        'blackjack',
        'sunflower-synth',
        'sampampulancer',
        'coding-portfolio-dev',
        'qr-dev',
        'landing-page-dev',
        'test-site-dev',
        'peaks-valleys-dev',
        'creative-coding-dev',
        'spaceblobman-dev',
        'sunrise-sunset-dev',
        'blackjack-dev',
        'sunflower-synth-dev',
        'sampampulancer-dev'
    ]

    request = event['Records'][0]['cf']['request']
    bucket_domain = event['Records'][0]['cf']['request']['origin']['s3']['domainName']
    routing_url = event['Records'][0]['cf']['request']['headers']['host'][0]['value']
    subdomain = routing_url.split('.')[0]
    # site = subdomain.replace('-dev', '')

    logger.info('Routing: {url}, {subdomain}'.format(url=routing_url, subdomain=subdomain))

    if subdomain not in keys_list:
        logger.error('Incorrect subdomain. Re-Routing to default root object.')
    elif subdomain == 'www' or subdomain == 'justinlmartin' or subdomain == 'qr':
        logger.info('Re-Routing to prod landing page')
        request['origin']['s3']['path'] = '/landing-page'
    elif subdomain == 'qr-dev':
        logger.info('Re-Routing to dev landing page')
        request['origin']['s3']['path'] = '/landing-page-dev'
    else:
        logger.info('Routing to {subdomain}'.format(subdomain=subdomain))
        request['origin']['s3']['path'] = '/{subdomain}'.format(subdomain=subdomain)

    request['headers']['host'] = [{
        'key': 'Host',
        'value': bucket_domain
    }]
    logger.info('Updated request to: {request}'.format(request=request))
    return request

