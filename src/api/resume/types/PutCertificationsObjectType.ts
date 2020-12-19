import { Field, ObjectType } from 'type-graphql';
import { Certification } from '../../../models/resume';

@ObjectType()
export class PutCertificationsObjectType {
  @Field((_type: unknown) => [Certification])
  certifications: Certification[];
}
