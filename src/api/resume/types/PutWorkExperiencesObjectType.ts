import { Field, ObjectType } from 'type-graphql';
import { WorkExperienceObjectType } from './WorkExperienceObjectType';

@ObjectType()
export class PutWorkExperiencesObjectType {
  @Field((_type: unknown) => [WorkExperienceObjectType])
  workExperiences: WorkExperienceObjectType[];
}
