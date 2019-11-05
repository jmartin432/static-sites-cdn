'use strict';

exports.handler = (event, context, callback) => {
    console.log("Event Received " + JSON.stringify(event));
    const request = event.Records[0].cf.request;
    let bucketDomain = event.Records[0].cf.request.origin.s3.domainName;
    let routingUrl = event.Records[0].cf.request.headers.host[0].value;

    const testSite = 'test-site';
    const peaksValleys = 'peaks-valleys';
    const creativeCoding = 'creative-coding';

    if (routingUrl.startsWith(testSite)) {
        console.log('Routing to test-site');
        request.origin.s3.path = `/${testSite}`
    } else if (routingUrl.startsWith(peaksValleys)) {
        console.log('Routing to peaks-valleys');
        request.origin.s3.path = `/${peaksValleys}`
    } else if (routingUrl.startsWith(creativeCoding)) {
        console.log('Routing to creative-coding');
        request.origin.s3.path = `/${creativeCoding}`
    } else {
        console.log('Routing to default root object as Default');
    }
    request.headers['host'] = [{ key: 'Host', value: bucketDomain}];
    request.uri = '/index.html';
    console.log('Updated Request ' + JSON.stringify(request));
    callback(null, request);
};
