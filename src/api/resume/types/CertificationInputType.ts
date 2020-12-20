// node_modules
import * as _ from 'lodash';
import { Field, InputType } from 'type-graphql';

// models
import { CertificationInterface } from '../../../models/resume';

@InputType('CertificationsInputType')
export class CertificationInputType implements CertificationInterface {
  @Field()
  certificationId: string;

  @Field()
  startDate: string;

  @Field()
  endDate?: string;

  @Field()
  name: string;

  @Field()
  institution: string;
}
