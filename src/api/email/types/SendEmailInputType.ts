// node_modules
import { Field, InputType } from 'type-graphql';
import { EmailAddress, EmailAttachment } from '../../../models/email';

@InputType()
export class SendEmailInputType {
  @Field((_type: unknown) => [EmailAddress])
  to: EmailAddress[];

  @Field((_type: unknown) => [EmailAddress], { nullable: true })
  cc: EmailAddress[];

  @Field((_type: unknown) => [EmailAddress], { nullable: true })
  bcc: EmailAddress[];

  @Field((_type: unknown) => String)
  subject: string;

  @Field((_type: unknown) => String, { nullable: true })
  text: string;

  @Field((_type: unknown) => String, { nullable: true })
  html: string;

  @Field((_type: unknown) => [EmailAttachment], { nullable: true })
  attachments: EmailAttachment[];
}
