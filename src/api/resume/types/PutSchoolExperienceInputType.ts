import { Field, InputType } from 'type-graphql';
import { SchoolExperience } from '../../../models/resume';

@InputType()
export class PutSchoolExperienceInputType {
  @Field((_type: unknown) => SchoolExperience)
  schoolExperience: SchoolExperience;
}
