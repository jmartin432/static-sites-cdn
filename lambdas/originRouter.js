'use strict';

exports.handler = (event, context, callback) => {
    console.log("Event Received " + JSON.stringify(event));
    const request = event.Records[0].cf.request;
    let bucketDomain = event.Records[0].cf.request.origin.s3.domainName;
    let routingUrl = event.Records[0].cf.request.headers.host[0].value;

    const testSite = 'test-site';
    const peaksValleys = 'peaks-valleys';
    const creativeCoding = 'creative-coding';
    const hangman = 'hangman';
    const sunriseSunset = 'sunrise';
    const blackjack = 'blackjack';
    const portfolio = 'portfolio';

    if (routingUrl.startsWith(testSite)) {
        console.log('Routing to test-site');
        request.origin.s3.path = `/${testSite}`;
    } else if (routingUrl.startsWith(peaksValleys)) {
        console.log('Routing to peaks-valleys');
        request.origin.s3.path = `/${peaksValleys}`;
    } else if (routingUrl.startsWith(creativeCoding)) {
        console.log('Routing to creative-coding');
        request.origin.s3.path = `/${creativeCoding}`;
    } else if (routingUrl.startsWith(hangman)) {
        console.log('Routing to hangman');
        request.origin.s3.path = `/${hangman}`;
    } else if (routingUrl.startsWith(sunriseSunset)) {
        console.log('Routing to sunrise-sunset');
        request.origin.s3.path = `/${sunriseSunset}`
    } else if (routingUrl.startsWith(blackjack)) {
        console.log('Routing to blackjack');
        request.origin.s3.path = `/${blackjack}`;
    } else if (routingUrl.startsWith(portfolio)) {
        console.log('Routing to blackjack');
        request.origin.s3.path = `/${portfolio}`;
    } else {
        console.log('Routing to default root object as Default');
    }
    request.headers['host'] = [{ key: 'Host', value: bucketDomain}];
    console.log('Updated Request ' + JSON.stringify(request));
    callback(null, request);
};
