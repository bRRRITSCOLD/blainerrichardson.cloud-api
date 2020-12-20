import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteCertificationsInputType {
  @Field((_type: unknown) => [String])
  certificationIds: string[];
}
