// node_modules
import * as yup from 'yup';
import * as _ from 'lodash';

// models
import { EmailAttachmentInterface } from "./EmailAttachment";

export interface EmailInterface {
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  attachments: EmailAttachmentInterface[];
}

export const emailSchema = yup.object().shape({});

export class Email {

  public constructor(email: EmailInterface) {
    _.assign(
      this,
      email,
      {}
    );
  }

  /**
   *
   *
   * @returns {({ value: User | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof User
   */
  public validate(): { value: Email | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: Email | undefined;
      try {
        const validateSyncResponse = emailSchema.validateSync(
          _.assign({}, this),
          { strict: true },
        ) as any;
        validationValue = new Email(validateSyncResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof User
   */
  public async validateAsync(): Promise<{ value: Email | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: Email | undefined;
      try {
        const validateResponse = await await emailSchema.validate(
          _.assign({}, this),
          { strict: true },
        ) as any;
        validationValue = new Email(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}