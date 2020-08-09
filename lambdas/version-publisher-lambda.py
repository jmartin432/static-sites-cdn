import boto3
import time
import logging
import json
import requests

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    logger.info(event)
    try:
        request_type = event.get('RequestType', None)
        resource_type = event.get('ResourceType', None)
        response_url = event.get('ResponseURL', None)
        request_properties = event.get('ResourceProperties', None)
        function_names = request_properties['FunctionNames']

        response_data = {
            'StackId': event.get('StackId', None),
            'RequestId': event.get('RequestId', None),
            'LogicalResourceId': event.get('LogicalResourceId', ""),
            'PhysicalResourceId': event.get('PhysicalResourceId', '{name}-{version}'
                                            .format(name=context.function_name, version=context.function_version)),
            'Data': {},
            'Reason': 'Check CloudWatch'
        }
    except Exception:
        logger.exception('There was an error reading event data:')
        return {}
    try:
        client = boto3.client('lambda')
    except Exception:
        logger.exception('There was an error creating Lambda Client:')
        response_data['Status'] = 'FAILED'
        return {response_data}

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
            logger.exception('There was an error sending publish version request, returning: {response}'
                             .format(response=response_data))
            return response_data

    logger.info('Ready to send data: {data}'.format(data=response_data['Data']))

    json_response_data = json.dumps(response_data)
    headers = {
        'content-type': '',
        'content-length': str(len(json_response_data))
    }
    logger.info('Sending response to S3 for CloudFormation: {response}'.format(response=json_response_data))
    try:
        s3_response = requests.put(
            response_url,
            data=json_response_data,
            headers=headers)
        logger.info('S3 returned status code: {response}'.format(response=s3_response))
    except Exception:
        response_data['Status'] = 'FAILED'
        logger.exception('There was an error sending response to S3 Bucket, returning: {response}'
                         .format(response=response_data))
        return response_data

    return response_data

