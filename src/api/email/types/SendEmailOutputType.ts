// node_modules
import { Field, ObjectType } from 'type-graphql';

// types
import { EmailType } from './EmailType';

@ObjectType('SendEmailOutputType', { description: 'Send Email Output Type' })
export class SendEmailOutputType {
  @Field((_type: unknown) => String)
  messageId: string;

  @Field((_type: unknown) => EmailType)
  email: EmailType;
}
