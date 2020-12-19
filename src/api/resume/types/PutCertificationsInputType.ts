import { Field, InputType } from 'type-graphql';
import { Certification } from '../../../models/resume';

@InputType()
export class PutCertificationInputType {
  @Field((_type: unknown) => [Certification])
  certification: Certification[];
}
