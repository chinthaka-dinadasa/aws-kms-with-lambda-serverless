import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { KMSClient, DecryptCommandInput, DecryptCommand } from "@aws-sdk/client-kms";
const kmsClient = new KMSClient({ region: process.env.AWS_REGION });
interface Response {
  statusCode: number;
  body: string;
}

exports.hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  console.log(`${process.env.APP_CONFIG_DATABASE_PASSWORD}`);
  console.log(`${process.env.APP_CONFIG_KMS_KEY_ARN}`);

  const decryptInput: DecryptCommandInput = {
    CiphertextBlob: Buffer.from(`${process.env.APP_CONFIG_DATABASE_PASSWORD}`, "base64"),
    KeyId: `${process.env.APP_CONFIG_KMS_KEY_ARN}`,  
  };

  const decryptCommand = new DecryptCommand(decryptInput)

  const decryptionResponse = await kmsClient.send(decryptCommand);
  const decryptedText = decryptionResponse.Plaintext;

  const decoder = new TextDecoder("utf-8");
  const plaintextString = decoder.decode(decryptedText);
  console.log('decryptedText', plaintextString);

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v4! Your function executed successfully!',
    }),
  };
  return response;
};
