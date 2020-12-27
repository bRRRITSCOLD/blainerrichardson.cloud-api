// node_modules
import * as _ from 'lodash';
import { Field, InputType } from 'type-graphql';

@InputType('UserTokenInputType')
export class UserTokenInputType {
  @Field()
  tokenType: string;

  @Field()
  token: string;
}
