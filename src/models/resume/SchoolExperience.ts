// node_modules
import * as _ from 'lodash';
import { Field, InputType, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';

// libraries
import { dateUtils } from '../../lib/utils/date';

export interface SchoolExperienceCompanyAddressInterface {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export class SchoolExperienceCompanyAddress implements SchoolExperienceCompanyAddressInterface {
  public addressLine1: string;
  public addressLine2?: string;
  public city: string;
  public state: string;
  public zipCode: string;

  public constructor(schoolExperienceCompanyAddress: Partial<SchoolExperienceCompanyAddressInterface>) {
    _.assign(this, schoolExperienceCompanyAddress, {
      addressLine1: _.get(schoolExperienceCompanyAddress, 'addressLine1'),
      addressLine2: _.get(schoolExperienceCompanyAddress, 'addressLine2'),
      city: _.get(schoolExperienceCompanyAddress, 'city'),
      state: _.get(schoolExperienceCompanyAddress, 'state'),
      zipCode: _.get(schoolExperienceCompanyAddress, 'zipCode'),
    });
  }
}

export const schoolExperienceAddressSchema = yup.object().shape({
  addressLine1: yup.string().required(),
  addressLine2: yup.string().optional(),
  city: yup.string().required(),
  state: yup.string().required(),
  zipCode: yup.string().required(),
});

export interface SchoolExperienceInterface {
  schoolExperienceId: string;
  startDate: string;
  endDate?: string;
  schoolName: string;
  schoolAddress: SchoolExperienceCompanyAddressInterface;
  degree?: string;
  classes: string[];
}

export const schoolExperienceSchema = yup.object().shape({
  schoolExperienceId: yup.string().required(),
  startDate: yup
    .mixed()
    .test('is-date', '${path} is not a valid date', (value, _context) => dateUtils.isValid(value))
    .required(),
  endDate: yup
    .mixed()
    .test('is-date', '${path} is not a valid date', (value, _context) => dateUtils.isValid(value))
    .optional(),
  schoolName: yup.string().required(),
  schoolAddress: schoolExperienceAddressSchema,
  degree: yup.string().required(),
  classes: yup.array().of(yup.string().optional()).required(),
});

export class SchoolExperience implements SchoolExperienceInterface {
  public schoolExperienceId: string;
  public startDate: string;
  public endDate?: string;
  public schoolName!: string;
  public schoolAddress: SchoolExperienceCompanyAddress;
  public degree: string;
  public classes!: string[];

  public constructor(schoolExperience: Partial<SchoolExperienceInterface>) {
    _.assign(this, schoolExperience, {
      schoolExperienceId: _.get(schoolExperience, 'schoolExperienceId', uuid()),
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
        const validateResponse = (await schoolExperienceSchema.validate(_.assign({}, this), { strict: true })) as any;
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
