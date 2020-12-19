import { Field, InputType } from 'type-graphql';
import { SchoolExperience } from '../../../models/resume';

@InputType()
export class PutSchoolExperiencesInputType {
  @Field((_type: unknown) => [SchoolExperience])
  schoolExperiences: SchoolExperience[];
}
