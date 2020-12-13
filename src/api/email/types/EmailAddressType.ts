// node_modules
import { Field, InputType, ObjectType } from 'type-graphql';

// models
import { EmailAddressInterface } from '../../../models/email';

@InputType('EmailAddressInputType', { description: 'Email Address Input Type' })
@ObjectType('EmailAddressObjectType', { description: 'Email Address Object Type' })
export class EmailAddressType implements EmailAddressInterface {
  @Field((_type: unknown) => String, { nullable: true })
  name?: string;

  @Field((_type: unknown) => String)
  address: string;
}
