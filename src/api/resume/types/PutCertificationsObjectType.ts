import { Field, ObjectType } from 'type-graphql';
import { Certification } from '../../../models/resume';

@ObjectType()
export class PutCertificationResponseObjectType {
  @Field((_type: unknown) => [Certification])
  certifications: Certification[];
}
