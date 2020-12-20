// node_modules
import * as _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';

// models
import { CertificationInterface } from '../../../models/resume';

@ObjectType('CertificationsObjectType')
export class CertificationObjectType implements CertificationInterface {
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
