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

@ObjectType('WorkExperienceCompanyAddressObjectType')
@InputType('WorkExperienceCompanyAddressInputType')
export class WorkExperienceCompanyAddress implements WorkExperienceCompanyAddressInterface {
  @Field()
  addressLine1: string;

  @Field({ nullable: true })
  addressLine2?: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipCode: string;
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

@ObjectType('WorkExperienceObjectType')
@InputType('WorkExperienceInputType')
export class WorkExperience implements WorkExperienceInterface {
  @Field()
  workExperienceId: string;

  @Field()
  startDate: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field()
  companyName: string;

  @Field((_type) => WorkExperienceCompanyAddress)
  companyAddress: WorkExperienceCompanyAddress;

  @Field()
  position: string;

  @Field((_type) => [String])
  duties: string[];

  @Field((_type) => [String])
  accomplishments: string[];

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
