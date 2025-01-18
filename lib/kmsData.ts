import {
  DecryptCommand,
  DecryptCommandInput,
  KMSClient,
} from '@aws-sdk/client-kms';

const kmsClient = new KMSClient({ region: process.env.AWS_REGION });

export const processDecrytion = async (encryptedData: string) => {

  //Decryption using AWS KMS CLient
  const decryptInput: DecryptCommandInput = {
    CiphertextBlob: Buffer.from(encryptedData, 'base64'),
    KeyId: `${process.env.APP_CONFIG_KMS_KEY_ARN}`,
  };

  const decryptCommand = new DecryptCommand(decryptInput);

  const decryptionResponse = await kmsClient.send(decryptCommand);
  const decryptedText = decryptionResponse.Plaintext;

  //Decoding the decrypted text using text decoder to get the original text
  const decoder = new TextDecoder("utf-8");
  const plaintextString = decoder.decode(decryptedText);
  console.log('decryptedText', plaintextString);

  return plaintextString;
};
