// node_modules
import * as yup from 'yup';
import * as _ from 'lodash';

// models
import { EmailAttachment, EmailAttachmentInterface, emailAttachmentSchema } from './EmailAttachment';
import { EmailAddress, EmailAddressInterface, emailAddressSchema } from './EmailAddress';

export interface EmailInterface {
  from: EmailAddressInterface;
  to: EmailAddressInterface[];
  cc?: EmailAddressInterface[];
  bcc?: EmailAddressInterface[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: EmailAttachmentInterface[];
}

export const emailSchema = yup.object().shape({
  from: emailAddressSchema.label('From').required(),
  to: yup.array().label('To').of(emailAddressSchema).required(),
  cc: yup.array().label('CC').of(emailAddressSchema).optional(),
  bcc: yup.array().label('Bcc').of(emailAddressSchema).optional(),
  subject: yup.string().label('Subject').required(),
  text: yup.string().label('Text').optional(),
  html: yup.string().label('Html').optional(),
  attachments: yup.array().label('Attachments').of(emailAttachmentSchema).optional(),
});

export class Email {
  public from!: EmailAddress;
  public to!: EmailAddress[];
  public cc?: EmailAddress[];
  public bcc?: EmailAddress[];
  public subject!: string;
  public text?: string;
  public html?: string;
  public attachments?: EmailAttachment[];

  public constructor(email: EmailInterface) {
    _.assign(this, email, {
      from: new EmailAddress(_.get(email, 'from')),
      to:
        _.get(email, 'to') && Array.isArray(_.get(email, 'to'))
          ? _.get(email, 'to', [] as EmailAddressInterface[]).map((item: EmailAddressInterface) => new EmailAddress(item))
          : _.get(email, 'to'),
      cc:
        _.get(email, 'cc') && Array.isArray(_.get(email, 'cc'))
          ? _.get(email, 'cc', [] as EmailAddressInterface[]).map((item: EmailAddressInterface) => new EmailAddress(item))
          : _.get(email, 'cc'),
      bcc:
        _.get(email, 'bcc') && Array.isArray(_.get(email, 'bcc'))
          ? _.get(email, 'bcc', [] as EmailAddressInterface[]).map((item: EmailAddressInterface) => new EmailAddress(item))
          : _.get(email, 'bcc'),
      subject: _.get(email, 'subject'),
      text: _.get(email, 'text'),
      html: _.get(email, 'html'),
      attachments:
        _.get(email, 'attachments') && Array.isArray(_.get(email, 'attachments'))
          ? _.get(email, 'attachments', [] as EmailAttachmentInterface[]).map((item: EmailAttachmentInterface) => new EmailAttachment(item))
          : _.get(email, 'attachments'),
    });
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
        const validateResponse = (await emailSchema.validate(_.assign({}, this), { strict: true })) as any;
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
