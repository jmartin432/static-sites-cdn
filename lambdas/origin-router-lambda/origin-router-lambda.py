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
        'unicorn-warp'
    ]

    request = event['Records'][0]['cf']['request']
    bucket_domain = event['Records'][0]['cf']['request']['origin']['s3']['domainName']
    routing_url = event['Records'][0]['cf']['request']['headers']['host'][0]['value']
    subdomain = routing_url.split('.')[0]
    site = subdomain.replace('-dev', '')

    logger.info('Routing: {url}, {subdomain}, {site}'.format(url=routing_url, subdomain=subdomain, site=site))

    if site not in keys_list:
        logger.error('Incorrect subdomain. Routing to default root object.')
    elif site == 'www' or site == 'justinlmartin' or site == 'qr':
        logger.info('Re-Routing to landing page')
        request['origin']['s3']['path'] = '/landing-page'
    else:
        logger.info('Routing to {site}'.format(site=site))
        request['origin']['s3']['path'] = '/{site}'.format(site=site)

    request['headers']['host'] = [{
        'key': 'Host',
        'value': bucket_domain
    }]
    logger.info('Updated request to: {request}'.format(request=request))
    return request

