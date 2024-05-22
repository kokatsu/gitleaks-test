import { emailFilterAllowlistHandler } from './email-filter-allowlist';

/**
 * This async handler iterates over the given modules and awaits them.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 */
export const handler = async (event) => {
  await emailFilterAllowlistHandler(event);
  return event;
};
