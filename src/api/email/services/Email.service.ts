// node_modules
import { Service } from 'typedi';
import * as _ from 'lodash';

// libraries
import { anyUtils } from '../../../lib/utils/any';
import { logger } from '../../../lib/logger';

// models
import { APIError } from '../../../models/error';
import { EmailInterface } from '../../../models/email';

// data-management
import * as emailManager from '../../../data-management/email';
import { SendEmailResponseInterface } from '../../../data-management/email';

@Service()
export class EmailService {
  public async sendEmail(email: EmailInterface): Promise<SendEmailResponseInterface> {
    try {
      // call data-management layer to send email
      const sendEmailResponse = await emailManager.sendEmail({ email });

      // return health check explicitly
      return sendEmailResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}EmailService::#sendEmail::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}
