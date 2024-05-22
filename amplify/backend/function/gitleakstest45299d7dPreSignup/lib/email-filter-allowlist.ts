import * as aws from 'aws-sdk';

/**
 * @type {import('@types/aws-lambda').PreSignUpTriggerHandler}
 */
export const emailFilterAllowlistHandler = async (event) => {
  // allowed domains
  const ald = process.env.DOMAINALLOWLIST.split(',').map((d) => d.trim());

  const { email } = event.request.userAttributes;
  const domain = email.substring(email.indexOf('@') + 1);

  if (!ald.includes(domain)) {
    throw new Error(`Invalid email domain: ${domain}`);
  }

  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ['MAILALLOWLIST'].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const mailAllowList = Parameters[0].Value.split(',');
  if (!email.includes(mailAllowList)) {
    if (!ald.includes(domain)) {
      throw new Error(`Invalid email: ${email}`);
    }
  }

  return event;
};
