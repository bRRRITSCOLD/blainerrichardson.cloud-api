// node_modules
import * as _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';

@ObjectType('UnauthenticateUserObjectType')
export class UnauthenticateUserObjectType {
  @Field((_type) => Boolean)
  success: boolean;
}
