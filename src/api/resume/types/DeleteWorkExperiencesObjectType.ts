import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DeleteWorkExperiencesObjectType {
  @Field((_type: unknown) => [String])
  workExperienceIds: string[];
}
