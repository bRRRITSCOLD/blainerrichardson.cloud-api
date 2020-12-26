// node_modules
import * as _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';

// models
import { UserInterface } from '../../../models/user';

@ObjectType('UserObjectType')
export class UserObjectType implements UserInterface {
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
