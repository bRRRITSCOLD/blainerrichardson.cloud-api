// node_modules
import { Field, ObjectType } from 'type-graphql';
import { SchoolExperience } from '../../../models/resume';

@ObjectType()
export class SearchSchoolExperienceResponseObjectType {
  @Field((_type: unknown) => [SchoolExperience])
  schoolExperiences: SchoolExperience[];

  @Field()
  moreSchoolExperiences: boolean;

  @Field({ nullable: true })
  totalSchoolExperiences: number;
}
