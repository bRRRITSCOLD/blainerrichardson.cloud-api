import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DeleteSchoolExperiencesObjectType {
  @Field((_type: unknown) => [String])
  schoolExperienceIds: string[];
}
