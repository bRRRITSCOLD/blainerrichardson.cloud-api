import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteSchoolExperiencesInputType {
  @Field((_type: unknown) => [String])
  schoolExperienceIds: string[];
}
