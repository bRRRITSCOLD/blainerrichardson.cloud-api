// node_modules
import * as _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';

// models
import { WorkExperienceCompanyAddressInterface, WorkExperienceInterface } from '../../../models/resume';

@ObjectType('WorkExperienceCompanyAddressObjectType')
export class WorkExperienceCompanyAddressObjectType implements WorkExperienceCompanyAddressInterface {
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

@ObjectType('WorkExperienceObjectType')
export class WorkExperienceObjectType implements WorkExperienceInterface {
  @Field()
  workExperienceId: string;

  @Field()
  startDate: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field()
  companyName: string;

  @Field((_type) => WorkExperienceCompanyAddressObjectType)
  companyAddress: WorkExperienceCompanyAddressObjectType;

  @Field()
  position: string;

  @Field((_type) => [String])
  duties: string[];

  @Field((_type) => [String])
  accomplishments: string[];
}
