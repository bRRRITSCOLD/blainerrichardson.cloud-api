// node_modules
import * as _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';

@ObjectType('UserTokenObjectType')
export class UserTokenObjectType {
  @Field()
  userId: string;

  @Field((_type) => String)
  tokenType: string | any;

  @Field()
  userTokenId: string;

  @Field()
  token: string;

  @Field()
  expireDate: string;
}
