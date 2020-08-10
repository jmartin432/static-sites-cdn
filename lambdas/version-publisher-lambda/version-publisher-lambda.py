import boto3
import time
import logging
import json
import requests

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def send_response(data, url):
    try:
        json_data = json.dumps(data)
        logger.info('Sending response to presigned URL for CloudFormation: {response}'.format(response=json_data))
        headers = {
            'content-type': '',
            'content-length': str(len(json_data))
        }

        response = requests.put(
            url,
            data=json_data,
            headers=headers)
        logger.info('CloudFormation returned response: {response}'.format(response=response))
    except Exception as e:
        logger.info('Sending to Cloudformation FAILED: {e}'.format(e=e))
        raise

    return

    
def handler(event, context):
    logger.info('Received event: {event}'.format(event=event))
    logger.info('Context: {context}'.format(context=context))

    try:
        request_type = event.get('RequestType', None)
        response_url = event.get('ResponseURL', None)
        request_properties = event.get('ResourceProperties', None)
        function_names = request_properties['FunctionNames']

        response_data = {
            'StackId': event.get('StackId', None),
            'RequestId': event.get('RequestId', None),
            'LogicalResourceId': event.get('LogicalResourceId', ''),
            'PhysicalResourceId': event.get('PhysicalResourceId', '{name}-{version}'.format(name=context['function_name'], version=context['function_version'])),
            'Data': {},
            'Reason': 'Check CloudWatch'
        }
    except Exception:
        logger.exception('There was an error reading event data:')
        send_response(response_data, response_url)

    try:
        client = boto3.client('lambda')
    except Exception:
        logger.exception('There was an error creating Lambda Client:')
        response_data['Status'] = 'FAILED'
        send_response(response_data, response_url)

    for key in function_names:
        try:
            logger.info('Publishing version for function: {name}'.format(name=function_names[key]))
            publish_response = client.publish_version(
                FunctionName=function_names[key]
            )
            logger.info('Publish version response: {response}'.format(response=publish_response))
            if publish_response['ResponseMetadata']['HTTPStatusCode'] != 201:
                logger.error('Publish Version FAILED: HTTP Status Code: {status_code}'
                             .format(status_code=publish_response['ResponseMetadata']['HTTPStatusCode']))
                response_data['Status'] = 'FAILED'
            else:
                response_data['Status'] = 'SUCCESS'
                new_key = key + 'QualifiedArn'
                response_data['Data'][new_key] = publish_response['FunctionArn']
                logger.info('Qualified function ARN: {arn}'.format(arn=publish_response['FunctionArn']))
        except Exception:
            response_data['Status'] = 'FAILED'
            logger.exception('There was an error sending publish version request')
            send_response(response_data, response_url)

    logger.info('Ready to send data: {data}'.format(data=response_data['Data']))
    
    send_response(response_data, response_url)

    return response_data

