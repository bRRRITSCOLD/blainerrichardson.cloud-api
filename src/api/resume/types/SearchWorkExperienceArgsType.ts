// node_modules
import { ArgsType, Field, InputType, ObjectType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { WorkExperience } from '../../../models/resume';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 500;

@InputType()
export class SearchWorkExperienceSearchOptionsArgsType {
  @Field({ nullable: true, defaultValue: DEFAULT_PAGE_NUMBER })
  pageNumber: number;

  @Field({ nullable: true, defaultValue: DEFAULT_PAGE_SIZE })
  pageSize: number;
}

@ArgsType()
export class SearchWorkExperienceArgsType {
  @Field((_type: unknown) => GraphQLJSONObject)
  searchCriteria: Record<string, unknown>;

  @Field((_type: unknown) => SearchWorkExperienceSearchOptionsArgsType, {
    nullable: true,
    defaultValue: { pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE },
  })
  searchOptions: SearchWorkExperienceSearchOptionsArgsType;
}

@ObjectType()
export class SearchWorkExperienceResponseObjectType {
  @Field((_type: unknown) => [WorkExperience])
  workExperiences: WorkExperience[];

  @Field()
  moreWorkExperiences: boolean;

  @Field({ nullable: true })
  totalWorkExperiences: number;
}
