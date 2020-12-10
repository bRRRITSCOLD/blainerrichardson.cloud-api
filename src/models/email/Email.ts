// node_modules
import * as yup from 'yup';
import * as _ from 'lodash';

// models
import { EmailAttachmentInterface, emailAttachmentSchema } from './EmailAttachment';
import { EmailAddress, emailAddressSchema } from './EmailAddress';

export interface EmailInterface {
  from: EmailAddress;
  to: EmailAddress | EmailAddress[];
  cc?: EmailAddress | EmailAddress[];
  bcc?: EmailAddress | EmailAddress[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: EmailAttachmentInterface[];
}

export const emailSchema = yup.object().shape({
  from: emailAddressSchema.label('From').required(),
  to: yup.lazy((val: any) =>
    Array.isArray(val) ? yup.array().label('To').of(emailAddressSchema).required() : emailAddressSchema.label('To').required(),
  ),
  cc: yup.lazy((val: any) =>
    Array.isArray(val) ? yup.array().label('CC').of(emailAddressSchema).optional() : emailAddressSchema.label('Cc').optional(),
  ),
  bcc: yup.lazy((val: any) =>
    Array.isArray(val) ? yup.array().label('Bcc').of(emailAddressSchema).optional() : emailAddressSchema.label('Bcc').optional(),
  ),
  subject: yup.string().label('Subject').required(),
  text: yup.string().label('Text').optional(),
  html: yup.string().label('Html').optional(),
  attachments: yup.array().label('Attachments').of(emailAttachmentSchema).optional(),
});

export class Email {
  public from!: EmailAddress;
  public to!: EmailAddress | EmailAddress[];
  public cc?: EmailAddress | EmailAddress[];
  public bcc?: EmailAddress | EmailAddress[];
  public subject!: string;
  public text?: string;
  public html?: string;
  public attachments?: EmailAttachmentInterface[];

  public constructor(email: EmailInterface) {
    _.assign(this, email, {});
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
        const validateSyncResponse = emailSchema.validateSync(_.assign({}, this), { strict: true }) as any;
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
        const validateResponse = (await await emailSchema.validate(_.assign({}, this), { strict: true })) as any;
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
