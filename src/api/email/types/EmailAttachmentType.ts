// node_modules
import { Field, InputType, ObjectType } from 'type-graphql';

// models
import { EmailAttachmentInterface } from '../../../models/email';

@InputType('EmailAttachmentInputType', { description: 'Email Attachment Input Type' })
@ObjectType('EmailAttachmentObjectType', { description: 'Email Attachment Object Type' })
export class EmailAttachmentType implements EmailAttachmentInterface {
  @Field((_type: unknown) => String)
  filename: string;

  @Field((_type: unknown) => String, { nullable: true })
  content?: string;

  @Field((_type: unknown) => String, { nullable: true })
  path?: string;

  @Field((_type: unknown) => String, { nullable: true })
  contentType?: string;

  @Field((_type: unknown) => String, { nullable: true })
  encoding?: string;
}
