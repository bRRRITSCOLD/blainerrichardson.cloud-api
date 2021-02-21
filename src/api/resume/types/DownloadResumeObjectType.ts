import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DownloadResumeObjectType {
  @Field((_type: unknown) => String, { nullable: true })
  bytes: string;
}
