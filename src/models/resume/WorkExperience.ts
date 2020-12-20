// node_modules
import * as _ from 'lodash';
import { Field, InputType, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';

// libraries
import { dateUtils } from '../../lib/utils/date';

export interface WorkExperienceCompanyAddressInterface {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export const workExperienceAddressSchema = yup.object().shape({
  addressLine1: yup.string().required(),
  addressLine2: yup.string().optional(),
  city: yup.string().required(),
  state: yup.string().required(),
  zipCode: yup.string().required(),
});

export class WorkExperienceCompanyAddress implements WorkExperienceCompanyAddressInterface {
  public addressLine1: string;
  public addressLine2?: string;
  public city: string;
  public state: string;
  public zipCode: string;

  public constructor(workExperienceCompanyAddress: Partial<WorkExperienceCompanyAddressInterface>) {
    _.assign(this, workExperienceCompanyAddress, {
      addressLine1: _.get(workExperienceCompanyAddress, 'addressLine1'),
      addressLine2: _.get(workExperienceCompanyAddress, 'addressLine2'),
      city: _.get(workExperienceCompanyAddress, 'city'),
      state: _.get(workExperienceCompanyAddress, 'state'),
      zipCode: _.get(workExperienceCompanyAddress, 'zipCode'),
    });
  }
}

export interface WorkExperienceInterface {
  startDate: string;
  endDate?: string;
  companyName: string;
  companyAddress: WorkExperienceCompanyAddressInterface;
  position: string;
  duties: string[];
  accomplishments: string[];
}

export const workExperienceSchema = yup.object().shape({
  workExperienceId: yup.string().required(),
  startDate: yup
    .mixed()
    .test('is-date', '${path} is not a valid date', (value, _context) => dateUtils.isValid(value))
    .required(),
  endDate: yup
    .mixed()
    .test('is-date', '${path} is not a valid date', (value, _context) => dateUtils.isValid(value))
    .optional(),
  companyName: yup.string().required(),
  companyAddress: workExperienceAddressSchema,
  position: yup.string().required(),
  duties: yup.array().of(yup.string().optional()).required(),
  accomplishments: yup.array().of(yup.string().optional()).required(),
});

export class WorkExperience implements WorkExperienceInterface {
  public workExperienceId: string;
  public startDate: string;
  public endDate?: string;
  public companyName: string;
  public companyAddress: WorkExperienceCompanyAddress;
  public position: string;
  public duties: string[];
  public accomplishments: string[];

  public constructor(workExperience: Partial<WorkExperienceInterface>) {
    _.assign(this, workExperience, {
      workExperienceId: _.get(workExperience, 'workExperienceId', uuid()),
      startDate: dateUtils.dateTime(new Date(_.get(workExperience, 'startDate', new Date()))),
      endDate: _.get(workExperience, 'endDate') ? dateUtils.dateTime(new Date(_.get(workExperience, 'endDate') as any)) : undefined,
      companyName: _.get(workExperience, 'companyName'),
      companyAddress: _.get(workExperience, 'companyAddress'),
      position: _.get(workExperience, 'position'),
      duties: _.get(workExperience, 'duties', []),
      accomplishments: _.get(workExperience, 'accomplishments', []),
    });
  }

  /**
   *
   *
   * @returns {({ value: User | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof User
   */
  public validate(): { value: WorkExperience | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: WorkExperience | undefined;
      try {
        const validateSyncResponse = workExperienceSchema.validateSync(_.assign({}, this), { strict: true }) as any;
        validationValue = new WorkExperience(validateSyncResponse);
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
  public async validateAsync(): Promise<{ value: WorkExperience | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: WorkExperience | undefined;
      try {
        const validateResponse = (await await workExperienceSchema.validate(_.assign({}, this), { strict: true })) as any;
        validationValue = new WorkExperience(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}
