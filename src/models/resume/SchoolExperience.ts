// node_modules
import * as _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { dateUtils } from '../../lib/utils/date';

@ObjectType()
export class SchoolExperienceCompanyAddress {
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

export interface SchoolExperienceInterface {
  startDate: string;
  endDate?: string;
  schoolName: string;
  schoolAddress: SchoolExperienceCompanyAddress;
  degree?: string;
  classes: string[];
}

export const schoolExperienceSchema = yup.object().shape({
  startDate: yup.date().required(),
  endDate: yup.date().optional(),
  name: yup.string().required(),
  institution: yup.string().required(),
});

@ObjectType()
export class SchoolExperience implements SchoolExperienceInterface {
  @Field()
  startDate: string;

  @Field()
  endDate?: string;

  @Field()
  schoolName!: string;

  @Field((_type) => SchoolExperienceCompanyAddress)
  schoolAddress: SchoolExperienceCompanyAddress;

  @Field()
  degree: string;

  @Field((_type) => [String])
  classes!: string[];

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
