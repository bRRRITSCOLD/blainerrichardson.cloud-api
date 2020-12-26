// node_modules
import * as _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';

// models
import { UserObjectType } from './UserObjectType';
import { UserTokenObjectType } from './UserTokenObjectType';

@ObjectType('AuthenticateUserObjectType')
export class AuthenticateUserObjectType {
  @Field((_type) => UserObjectType)
  user: UserObjectType;

  @Field((_type) => UserTokenObjectType)
  userToken: UserTokenObjectType;
}
