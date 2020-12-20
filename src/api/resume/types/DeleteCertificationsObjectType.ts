import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DeleteCertificationsObjectType {
  @Field((_type: unknown) => [String])
  certificationIds: string[];
}
