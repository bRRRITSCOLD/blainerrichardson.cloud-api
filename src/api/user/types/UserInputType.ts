// node_modules
import * as _ from 'lodash';
import { Field, InputType } from 'type-graphql';

// models
import { UserInterface } from '../../../models/user';

@InputType('UserInputType')
export class UserInputType implements UserInterface {
  @Field()
  userId: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field((_type) => [String])
  roles: string[];
}
