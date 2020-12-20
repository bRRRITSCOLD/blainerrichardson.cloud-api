// node_modules
import { Field, ObjectType } from 'type-graphql';
import { SchoolExperienceObjectType } from './SchoolExperienceObjectType';

@ObjectType()
export class SearchSchoolExperiencesObjectType {
  @Field((_type: unknown) => [SchoolExperienceObjectType])
  schoolExperiences: SchoolExperienceObjectType[];

  @Field()
  moreSchoolExperiences: boolean;

  @Field({ nullable: true })
  totalSchoolExperiences: number;
}
