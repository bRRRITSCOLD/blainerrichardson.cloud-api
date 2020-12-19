// node_modules
import { Field, ObjectType } from 'type-graphql';
import { Certification } from '../../../models/resume';

@ObjectType()
export class SearchCertificationsObjectType {
  @Field((_type: unknown) => [Certification])
  certifications: Certification[];

  @Field()
  moreCertifications: boolean;

  @Field({ nullable: true })
  totalCertifications: number;
}
