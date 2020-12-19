import { Field, InputType } from 'type-graphql';
import { WorkExperience } from '../../../models/resume';

@InputType()
export class PutWorkExperiencesInputType {
  @Field((_type: unknown) => [WorkExperience])
  workExperiences: WorkExperience[];
}
