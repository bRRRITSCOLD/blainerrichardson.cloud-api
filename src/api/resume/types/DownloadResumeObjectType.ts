import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DownloadResumeObjectType {
  @Field((_type: unknown) => [String])
  content: string;
}
