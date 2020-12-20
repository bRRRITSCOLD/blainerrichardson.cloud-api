// node_modules
import { Field, ObjectType } from 'type-graphql';
import { WorkExperienceObjectType } from './WorkExperienceObjectType';

@ObjectType()
export class SearchWorkExperiencesObjectType {
  @Field((_type: unknown) => [WorkExperienceObjectType])
  workExperiences: WorkExperienceObjectType[];

  @Field()
  moreWorkExperiences: boolean;

  @Field({ nullable: true })
  totalWorkExperiences: number;
}
