import { Field, ObjectType } from 'type-graphql';
import { CertificationObjectType } from './CertificationObjectType';

@ObjectType()
export class PutCertificationsObjectType {
  @Field((_type: unknown) => [CertificationObjectType])
  certifications: CertificationObjectType[];
}
