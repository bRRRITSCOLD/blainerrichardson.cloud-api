import { Field, InputType } from 'type-graphql';
import { SchoolExperience } from '../../../models/resume';
import { SchoolExperienceInputType } from './SchoolExperienceInputType';

@InputType()
export class PutSchoolExperiencesInputType {
  @Field((_type: unknown) => [SchoolExperienceInputType])
  schoolExperiences: SchoolExperienceInputType[];
}
