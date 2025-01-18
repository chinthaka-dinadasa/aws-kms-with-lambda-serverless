import {
  DecryptCommand,
  DecryptCommandInput,
  KMSClient,
} from '@aws-sdk/client-kms';

const kmsClient = new KMSClient({ region: process.env.AWS_REGION });

/**
 * Decrypts the provided encrypted data using AWS KMS and returns the original plaintext string.
 *
 * @param {string} encryptedData - The base64 encoded encrypted data to be decrypted.
 * @returns {Promise<string>} - A promise that resolves to the decrypted plaintext string.
 *
 * @example
 * const encryptedData = "AQICAHj...";
 * const plaintext = await processDecrytion(encryptedData);
 * console.log(plaintext); // Outputs the decrypted plaintext string
 *
 * @throws {Error} - Throws an error if decryption fails.
 *
 * @remarks
 * This function uses the AWS KMS Client to decrypt the provided encrypted data.
 * It expects the KMS Key ARN to be available in the environment variable `APP_CONFIG_KMS_KEY_ARN`.
 * The decrypted data is decoded using a UTF-8 text decoder to obtain the original plaintext string.
 */
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
