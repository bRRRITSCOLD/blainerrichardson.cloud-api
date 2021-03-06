// node_modules
import { ArgsType, Field, InputType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 500;

@InputType()
export class SearchCertificationsSearchOptionsArgsType {
  @Field({ nullable: true, defaultValue: DEFAULT_PAGE_NUMBER })
  pageNumber: number;

  @Field({ nullable: true, defaultValue: DEFAULT_PAGE_SIZE })
  pageSize: number;
}

@ArgsType()
export class SearchCertificationsArgsType {
  @Field((_type: unknown) => GraphQLJSONObject)
  searchCriteria: Record<string, unknown>;

  @Field((_type: unknown) => SearchCertificationsSearchOptionsArgsType, {
    nullable: true,
    defaultValue: { pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE },
  })
  searchOptions: SearchCertificationsSearchOptionsArgsType;
}
