// node_modules
import * as _ from 'lodash';
import { Field, InputType, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';

// libraries
import { dateUtils } from '../../lib/utils/date';

export interface CertificationInterface {
  certificationId: string;
  startDate: string | Date;
  endDate?: string | Date;
  name: string;
  institution: string;
}

export const certficationShema = yup.object().shape({
  certificationId: yup.string().required(),
  startDate: yup
    .mixed()
    .test('is-date', '${path} is not a valid date', (value, _context) => dateUtils.isValid(value))
    .required(),
  endDate: yup
    .mixed()
    .test('is-date', '${path} is not a valid date', (value, _context) => dateUtils.isValid(value))
    .optional(),
  name: yup.string().required(),
  institution: yup.string().required(),
});

@ObjectType('CertificationObjectType')
@InputType('CertificationInputType')
export class Certification implements CertificationInterface {
  @Field()
  certificationId: string;

  @Field()
  startDate: string;

  @Field()
  endDate?: string;

  @Field()
  name: string;

  @Field()
  institution: string;

  public constructor(certification: Partial<CertificationInterface>) {
    _.assign(this, certification, {
      certificationId: _.get(certification, 'certificationId', uuid()),
      startDate: dateUtils.dateTime(new Date(_.get(certification, 'startDate', new Date()))),
      endDate: _.get(certification, 'endDate') ? dateUtils.dateTime(new Date(_.get(certification, 'endDate') as any)) : undefined,
      name: _.get(certification, 'name'),
      institution: _.get(certification, 'institution'),
    });
  }

  /**
   *
   *
   * @returns {({ value: User | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof User
   */
  public validate(): { value: Certification | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: Certification | undefined;
      try {
        const validateSyncResponse = certficationShema.validateSync(_.assign({}, this), { strict: true }) as any;
        validationValue = new Certification(validateSyncResponse);
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
  public async validateAsync(): Promise<{ value: Certification | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: Certification | undefined;
      try {
        const validateResponse = (await await certficationShema.validate(_.assign({}, this), { strict: true })) as any;
        validationValue = new Certification(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}
