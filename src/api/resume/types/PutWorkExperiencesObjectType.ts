import { Field, ObjectType } from 'type-graphql';
import { WorkExperience } from '../../../models/resume';

@ObjectType()
export class PutWorkExperiencesObjectType {
  @Field((_type: unknown) => [WorkExperience])
  workExperiences: WorkExperience[];
}
