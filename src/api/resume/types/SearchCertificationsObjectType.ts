// node_modules
import { Field, ObjectType } from 'type-graphql';
import { CertificationObjectType } from './CertificationObjectType';

@ObjectType()
export class SearchCertificationsObjectType {
  @Field((_type: unknown) => [CertificationObjectType])
  certifications: CertificationObjectType[];

  @Field()
  moreCertifications: boolean;

  @Field({ nullable: true })
  totalCertifications: number;
}
