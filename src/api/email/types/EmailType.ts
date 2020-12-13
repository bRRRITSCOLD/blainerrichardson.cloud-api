// node_modules
import { Field, InputType, ObjectType } from 'type-graphql';

// modles
import { EmailAddressType } from './EmailAddressType';
import { EmailAttachmentType } from './EmailAttachmentType';

@InputType('EmailInputType', { description: 'Email Input Type' })
@ObjectType('EmailObjectType', { description: 'Email Object Type' })
export class EmailType {
  @Field((_type: unknown) => EmailAddressType)
  from: EmailAddressType;

  @Field((_type: unknown) => [EmailAddressType])
  to: EmailAddressType[];

  @Field((_type: unknown) => [EmailAddressType], { nullable: true })
  cc?: EmailAddressType[];

  @Field((_type: unknown) => [EmailAddressType], { nullable: true })
  bcc?: EmailAddressType[];

  @Field((_type: unknown) => String)
  subject: string;

  @Field((_type: unknown) => String, { nullable: true })
  text?: string;

  @Field((_type: unknown) => String, { nullable: true })
  html?: string;

  @Field((_type: unknown) => [EmailAttachmentType], { nullable: true })
  attachments?: EmailAttachmentType[];
}
