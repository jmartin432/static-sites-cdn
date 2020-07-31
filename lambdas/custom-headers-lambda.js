'use strict';

exports.handler = (event, context, callback) => {
  console.log('Event Received: ' + JSON.stringify(event));
  const request = event.Records[0].cf.request;
  const host = request.headers.host[0].value;
  console.log(`Adding Custom Header: x-forwarded-host; ${host}`);
  request.headers["x-forwarded-host"] = [{
    key: "X-Forwarded-Host",
    value: host
  }];
  console.log('Updated Request: ' + JSON.stringify(request));
  callback(null, request);
};
