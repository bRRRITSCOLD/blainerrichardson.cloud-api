// node_modules
import * as _ from 'lodash';
import { Field, InputType } from 'type-graphql';

@InputType('AuthenticateUserInputType')
export class AuthenticateUserInputType {
  @Field()
  username: string;

  @Field()
  password: string;
}
