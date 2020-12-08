// node_modules
import { Field, ObjectType } from 'type-graphql';

// models

@ObjectType({ description: 'Utility Health Check Object Type' })
export class UtilityHealthCheckObjectType {
  @Field((_type: unknown) => String, { nullable: true })
  public status: 'HEALTHY' | 'UNHEALTHY';
}
