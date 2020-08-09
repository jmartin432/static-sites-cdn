'use strict';

exports.handler = (event, context, callback) => {
    console.info("Event Received " + JSON.stringify(event));

    let keysList = [
        'www',
        'justinlmartin',
        'portfolio',
        'test-site',
        'peaks-valleys',
        'creative-coding',
        'spaceblobman',
        'sunrise-sunset',
        'blackjack',
        'sunflower-synth',
        'sampampulancer'
    ]

    const request = event.Records[0].cf.request
    let bucketDomain = event.Records[0].cf.request.origin.s3.domainName

    let routingUrl = event.Records[0].cf.request.headers.host[0].value;
    let subdomain = routingUrl.split('.')[0]
    let site = subdomain.replace('-dev', ' ')

    console.info('Routing: ', routingUrl, subdomain, site)

    if (!keysList.includes(site)) {
        console.error('Incorrect subdomain. Routing to default root object.')
    } else if ( site === 'www' || site === 'portfolio' || site === 'justinlmartin') {
        console.info('Routing to portfolio')
        request.origin.s3.path = `/portfolio`
    } else {
        console.info(`Routing to ${site}`)
        request.origin.s3.path = `/${site}`
    }

    request.headers['host'] = [{ key: 'Host', value: bucketDomain}];
    console.log('Updated request to:' + JSON.stringify(request));
    callback(null, request)
}
