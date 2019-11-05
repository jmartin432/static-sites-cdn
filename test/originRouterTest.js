const expect  = require('chai').expect;
const originRouter = require('../lambdas/originRouter');
const event = require('./origin-request-test-event');

it('Test test-site-dev', () => {
    event.Records[0].cf.request.headers.host[0].value = "test-site-dev.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/test-site');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
    });
});

it('Test peaks-valleys-dev', () => {
    event.Records[0].cf.request.headers.host[0].value = "peaks-valleys-dev.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/peaks-valleys');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
    });
});

it('Test creative-coding-dev', () => {
    event.Records[0].cf.request.headers.host[0].value = "creative-coding-dev.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/creative-coding');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
    });
});

it('Test test-site-prod', () => {
    event.Records[0].cf.request.headers.host[0].value = "test-site.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/test-site');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
    });
});

it('Test peaks-valleys-prod', () => {
    event.Records[0].cf.request.headers.host[0].value = "peaks-valleys.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/peaks-valleys');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
    });
});

it('Test creative-coding-prod', () => {
    event.Records[0].cf.request.headers.host[0].value = "creative-coding.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/creative-coding');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
    });
});
