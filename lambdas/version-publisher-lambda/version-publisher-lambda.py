import boto3
import logging
import json
import requests
import hashlib

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


def get_hash(stack_id, logical_id, time_stamp):
    h = hashlib.new('md5')
    h.update(stack_id.encode('utf-8'))
    h.update(logical_id.encode('utf-8'))
    h.update(time_stamp.encode('utf-8'))
    return 'static-sites-cdn-version-publish-{hash}'.format(hash=str(h.hexdigest())[0:7])


def handler(event, context):
    logger.info('Received event: {event}'.format(event=json.dumps(event)))
    request_type = event.get('RequestType', None)
    response_url = event.get('ResponseURL', None)
    request_properties = event.get('ResourceProperties', None)
    time_stamp = request_properties['TimeStamp']
    response_data = {
        'StackId': event.get('StackId', None),
        'RequestId': event.get('RequestId', None),
        'LogicalResourceId': event.get('LogicalResourceId', None),
        'PhysicalResourceId': event.get('PhysicalResourceId', None)
    }
    if request_type == 'Delete':
        logger.info('Received Delete Request')
        response_data['Status'] = 'SUCCESS'
        send_response(response_data, response_url)
        return response_data
    elif request_type == 'Create':
        logger.info('Received Create Request')

    else:
        logger.info('Received Update Request')

    response_data['PhysicalResourceId'] = get_hash(response_data['StackId'],
                                                   response_data['LogicalResourceId'],
                                                   time_stamp)
    logger.info('New Resource Physical ID: {id}'.format(id=response_data['PhysicalResourceId']))

    response_data['Data'] = {
        'PhysicalResourceId': response_data['PhysicalResourceId']
    }
    response_data['Reason'] = 'Check CloudWatch'

    function_arns = request_properties['FunctionArns']
    lambda_client = boto3.client('lambda')

    for key in function_arns:
        try:
            logger.info('Publishing version for function: {name}'.format(name=function_arns[key]))
            publish_response = lambda_client.publish_version(
                FunctionName=function_arns[key]
            )
            logger.info('Publish version response: {response}'.format(response=json.dumps(publish_response)))
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

    logger.info('Ready to send data: {data}'.format(data=json.dumps(response_data['Data'])))
    
    send_response(response_data, response_url)

    return response_data

