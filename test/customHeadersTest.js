const expect  = require('chai').expect;
const customHeaders = require('../lambdas/custom-headers-lambda');
const event = require('./viewer-request-test-event');

it('Test test-site-dev', () => {
    event.Records[0].cf.request.headers.host[0].value = "test-site-dev.justinlmartin.com";
    customHeaders.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.headers["x-forwarded-host"][0].value).to.equal('test-site-dev.justinlmartin.com');
    });
});

