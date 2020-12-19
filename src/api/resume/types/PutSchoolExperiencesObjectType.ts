import { Field, ObjectType } from 'type-graphql';
import { SchoolExperience } from '../../../models/resume';

@ObjectType()
export class PutSchoolExperiencesObjectType {
  @Field((_type: unknown) => [SchoolExperience])
  schoolExperiences: SchoolExperience[];
}
