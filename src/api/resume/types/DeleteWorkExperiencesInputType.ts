import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteWorkExperiencesInputType {
  @Field((_type: unknown) => [String])
  workExperienceIds: string[];
}
