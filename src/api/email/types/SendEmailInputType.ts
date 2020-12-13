// node_modules
import { Field, InputType } from 'type-graphql';

// models
import { EmailType } from './EmailType';

@InputType('SendEmailInputType', { description: 'Send Email Input Type' })
export class SendEmailInputType {
  @Field((_type: unknown) => EmailType)
  email: EmailType;
}
