import { Field, InputType } from 'type-graphql';
import { Certification } from '../../../models/resume';

@InputType()
export class PutCertificationsInputType {
  @Field((_type: unknown) => [Certification])
  certifications: Certification[];
}
