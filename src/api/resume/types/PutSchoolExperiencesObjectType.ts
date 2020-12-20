import { Field, ObjectType } from 'type-graphql';
import { SchoolExperienceObjectType } from './SchoolExperienceObjectType';

@ObjectType()
export class PutSchoolExperiencesObjectType {
  @Field((_type: unknown) => [SchoolExperienceObjectType])
  schoolExperiences: SchoolExperienceObjectType[];
}
