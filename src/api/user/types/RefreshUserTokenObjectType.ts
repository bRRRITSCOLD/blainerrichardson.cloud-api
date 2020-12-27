// node_modules
import * as _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';

// models
import { UserObjectType } from './UserObjectType';
import { UserTokenObjectType } from './UserTokenObjectType';

@ObjectType('RefreshUserTokenObjectType')
export class RefreshUserTokenObjectType {
  @Field((_type) => UserObjectType)
  user: UserObjectType;

  @Field((_type) => UserTokenObjectType)
  userToken: UserTokenObjectType;
}
