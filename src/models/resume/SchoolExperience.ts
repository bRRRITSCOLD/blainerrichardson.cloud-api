// node_modules
import * as _ from 'lodash';
import * as yup from 'yup';
import { dateUtils } from '../../lib/utils/date';

export interface SchoolExperienceInterface {
  startDate: string | Date;
  endDate?: string | Date;
  schoolName: string;
  schoolAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  degree?: string;
  classes: string[];
}

export const schoolExperienceSchema = yup.object().shape({
  startDate: yup.date().required(),
  endDate: yup.date().optional(),
  name: yup.string().required(),
  institution: yup.string().required(),
});

export class SchoolExperience implements SchoolExperienceInterface {
  public startDate!: string | Date;
  public endDate?: string | Date;
  public schoolName!: string;
  public schoolAddress!: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  public degree?: string;
  public classes!: string[];

  public constructor(schoolExperience: Partial<SchoolExperienceInterface>) {
    _.assign(this, schoolExperience, {
      startDate: dateUtils.dateTime(new Date(_.get(schoolExperience, 'startDate', new Date()))),
      endDate: _.get(schoolExperience, 'endDate') ? dateUtils.dateTime(new Date(_.get(schoolExperience, 'endDate') as any)) : undefined,
      schoolName: _.get(schoolExperience, 'schoolName'),
      schoolAddress: _.get(schoolExperience, 'schoolAddress'),
      degree: _.get(schoolExperience, 'degree'),
      classes: _.get(schoolExperience, 'classes', []),
    });
  }

  /**
   *
   *
   * @returns {({ value: User | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof User
   */
  public validate(): { value: SchoolExperience | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: SchoolExperience | undefined;
      try {
        const validateSyncResponse = schoolExperienceSchema.validateSync(_.assign({}, this), { strict: true }) as any;
        validationValue = new SchoolExperience(validateSyncResponse);
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
  public async validateAsync(): Promise<{ value: SchoolExperience | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: SchoolExperience | undefined;
      try {
        const validateResponse = (await await schoolExperienceSchema.validate(_.assign({}, this), { strict: true })) as any;
        validationValue = new SchoolExperience(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}
