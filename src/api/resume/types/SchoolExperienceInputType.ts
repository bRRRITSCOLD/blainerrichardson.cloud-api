// node_modules
import * as _ from 'lodash';
import { Field, InputType } from 'type-graphql';

// models
import { SchoolExperienceCompanyAddressInterface, SchoolExperienceInterface } from '../../../models/resume';

@InputType('SchoolExperienceCompanyAddressInputType')
export class SchoolExperienceCompanyAddressInputType implements SchoolExperienceCompanyAddressInterface {
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

@InputType('SchoolExperienceInputType')
export class SchoolExperienceInputType implements SchoolExperienceInterface {
  @Field()
  schoolExperienceId: string;

  @Field()
  startDate: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field()
  schoolName: string;

  @Field((_type) => SchoolExperienceCompanyAddressInputType)
  schoolAddress: SchoolExperienceCompanyAddressInputType;

  @Field()
  degree: string;

  @Field((_type) => [String])
  classes: string[];
}
