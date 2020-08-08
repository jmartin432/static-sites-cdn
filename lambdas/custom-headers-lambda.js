'use strict';

exports.handler = (event, context, callback) => {
  console.info('Event Received: ' + JSON.stringify(event));
  const request = event.Records[0].cf.request;
  const host = request.headers.host[0].value;
  console.info(`Adding Custom Header: x-forwarded-host; ${host}`);
  request.headers["x-forwarded-host"] = [{
    key: "X-Forwarded-Host",
    value: host
  }];
  console.info('Updated request to: ' + JSON.stringify(request));
  callback(null, request);
};
