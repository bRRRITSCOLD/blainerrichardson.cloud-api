import { Field, InputType } from 'type-graphql';
import { CertificationInputType } from './CertificationInputType';

@InputType()
export class PutCertificationsInputType {
  @Field((_type: unknown) => [CertificationInputType])
  certifications: CertificationInputType[];
}
