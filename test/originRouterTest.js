const expect  = require('chai').expect;
const originRouter = require('../lambdas/originRouter');
const event = require('./origin-request-test-event');

// Dev Tests...

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
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

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
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

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
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');
    });
});

it('Test spaceblobman-dev', () => {
    event.Records[0].cf.request.headers.host[0].value = "spaceblobman-dev.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/spaceblobman');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});

it('Test sunrise-dev', () => {
    event.Records[0].cf.request.headers.host[0].value = "sunrise-dev.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/sunrise');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});

it('Test blackjack-dev', () => {
    event.Records[0].cf.request.headers.host[0].value = "blackjack-dev.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/blackjack');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});

it('Test portfolio-dev', () => {
    event.Records[0].cf.request.headers.host[0].value = "portfolio-dev.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/portfolio');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});


// Prod Tests...

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
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

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
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

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
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});

it('Test spaceblobman-prod', () => {
    event.Records[0].cf.request.headers.host[0].value = "spaceblobman.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/spaceblobman');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});

it('Test sunrise-prod', () => {
    event.Records[0].cf.request.headers.host[0].value = "sunrise.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/sunrise');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});

it('Test blackjack-prod', () => {
    event.Records[0].cf.request.headers.host[0].value = "blackjack.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/blackjack');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});

it('Test portfolio-prod', () => {
    event.Records[0].cf.request.headers.host[0].value = "portfolio.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/portfolio');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});

it('Test www prefix', () => {
    event.Records[0].cf.request.headers.host[0].value = "www.justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/portfolio');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});

it('Test top level domain', () => {
    event.Records[0].cf.request.headers.host[0].value = "justinlmartin.com";
    event.Records[0].cf.request.origin.s3.path = '/';
    originRouter.handler(event, {}, function(err, result) {
      if (err)
        console.log(err);
      if (result)
        console.log("Result: " + JSON.stringify(result, null, 2));
        expect(result.origin.s3.path).to.equal('/portfolio');
        expect(result.origin.s3.domainName).to.equal('static-sites-bucket.s3.amazonaws.com');
        expect(result.headers.host[0].value).to.equal('static-sites-bucket.s3.amazonaws.com');

    });
});
