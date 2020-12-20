// node_modules
import * as _ from 'lodash';
import { Field, InputType } from 'type-graphql';

// models
import { WorkExperienceCompanyAddressInterface, WorkExperienceInterface } from '../../../models/resume';

@InputType('WorkExperienceCompanyAddressInputType')
export class WorkExperienceCompanyAddressInputType implements WorkExperienceCompanyAddressInterface {
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

@InputType('WorkExperienceInputType')
export class WorkExperienceInputType implements WorkExperienceInterface {
  @Field()
  workExperienceId: string;

  @Field()
  startDate: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field()
  companyName: string;

  @Field((_type) => WorkExperienceCompanyAddressInputType)
  companyAddress: WorkExperienceCompanyAddressInputType;

  @Field()
  position: string;

  @Field((_type) => [String])
  duties: string[];

  @Field((_type) => [String])
  accomplishments: string[];
}
