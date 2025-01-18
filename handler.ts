import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { processDecrytion } from './lib/kmsData';

interface Response {
  statusCode: number;
  body: string;
}

exports.processDecryption = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  const decryptedDBPassword = await processDecrytion(`${process.env.APP_CONFIG_DATABASE_PASSWORD}`);
  const decryptedFacebookAuthToken = await processDecrytion(`${process.env.APP_CONFIG_FACEBOOK_PAGE_LONG_ACCESS_TOKEN}`);

  console.log('Decrypted DB Password: ', decryptedDBPassword);
  console.log('Decrypted FB Password: ', decryptedFacebookAuthToken);

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Decryption successful',
      db_password: decryptedDBPassword,
      fb_auth_token: decryptedFacebookAuthToken,
    }),
  };
  return response;
};
