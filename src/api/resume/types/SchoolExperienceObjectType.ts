// node_modules
import * as _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';

// models
import { SchoolExperienceCompanyAddressInterface, SchoolExperienceInterface } from '../../../models/resume';

@ObjectType('SchoolExperienceCompanyAddressObjectType')
export class SchoolExperienceCompanyAddressObjectType implements SchoolExperienceCompanyAddressInterface {
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

@ObjectType('SchoolExperienceObjectType')
export class SchoolExperienceObjectType implements SchoolExperienceInterface {
  @Field()
  schoolExperienceId: string;

  @Field()
  startDate: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field()
  schoolName: string;

  @Field((_type) => SchoolExperienceCompanyAddressObjectType)
  schoolAddress: SchoolExperienceCompanyAddressObjectType;

  @Field()
  degree: string;

  @Field((_type) => [String])
  classes: string[];
}
