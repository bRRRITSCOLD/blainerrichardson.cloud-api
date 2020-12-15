// node_modules
import * as _ from 'lodash';
import * as yup from 'yup';
import { dateUtils } from '../../lib/utils/date';

export interface CertificationInterface {
  startDate: string | Date;
  endDate?: string | Date;
  name: string;
  institution: string;
}

export const certficationShema = yup.object().shape({
  startDate: yup.date().required(),
  endDate: yup.date().optional(),
  name: yup.string().required(),
  institution: yup.string().required(),
});

export class Certification implements CertificationInterface {
  public startDate!: string | Date;
  public endDate?: string | Date;
  public name!: string;
  public institution!: string;

  public constructor(certification: Partial<CertificationInterface>) {
    _.assign(this, certification, {
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
