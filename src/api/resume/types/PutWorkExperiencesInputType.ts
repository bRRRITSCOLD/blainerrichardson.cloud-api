import { Field, InputType } from 'type-graphql';
import { WorkExperienceInputType } from './WorkExperienceInputType';

@InputType()
export class PutWorkExperiencesInputType {
  @Field((_type: unknown) => [WorkExperienceInputType])
  workExperiences: WorkExperienceInputType[];
}
