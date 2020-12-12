// libraries
import { emailClients } from '../../lib/email';
import { env } from '../../lib/environment';
import { logger } from '../../lib/logger';
import { anyUtils } from '../../lib/utils/any';

// models
import { Email, EmailInterface } from '../../models/email';
import { APIError } from '../../models/error';

export interface SendEmailRequestInterface {
  email: EmailInterface;
}

export interface SendEmailResponseInterface {
  messageId: string;
  email: Email;
}

export async function sendEmail(sendEmailRequest: SendEmailRequestInterface): Promise<SendEmailResponseInterface> {
  try {
    // deconstruct for ease of usage within this function
    const { email } = sendEmailRequest;

    // create email and validate
    const newEmail = new Email(email);
    const emailValidateAsyncResponse = await newEmail.validateAsync();
    if (emailValidateAsyncResponse.error) {
      throw emailValidateAsyncResponse.error;
    }

    // get the email client
    // that we want to use here
    const emailClient = emailClients.getClient(env.EMAIL_CLIENT_GMAIL_NAME);

    // send email once validated
    const sendEmailResponse = await emailClient.sendMail(newEmail as any);

    // return explicitly for the user to handle
    return {
      messageId: sendEmailResponse.messageId.replace('<', '').replace('>', '').replace('@gmail.com', ''),
      email: newEmail,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // log for debugging and run support purposes
    logger.error(`{}EmailManager::#sendEmail::error executing::error=${anyUtils.stringify(error)}`);

    // throw expliclty for user to handle
    throw err;
  }
}
