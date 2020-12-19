// node_modules
import { Field, ObjectType } from 'type-graphql';
import { WorkExperience } from '../../../models/resume';

@ObjectType()
export class SearchWorkExperiencesObjectType {
  @Field((_type: unknown) => [WorkExperience])
  workExperiences: WorkExperience[];

  @Field()
  moreWorkExperiences: boolean;

  @Field({ nullable: true })
  totalWorkExperiences: number;
}
