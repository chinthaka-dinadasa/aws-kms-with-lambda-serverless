import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface Response {
  statusCode: number;
  body: string;
}

exports.hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response: Response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v4! Your function executed successfully!',
    }),
  };
  return response;
};
