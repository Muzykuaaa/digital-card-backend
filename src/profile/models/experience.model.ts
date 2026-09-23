import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Work experience entry' })
export class Experience {
  @Field(() => ID)
  declare id: number;

  @Field({ description: 'Company or activity name' })
  declare company: string;

  @Field({ description: 'Job title' })
  declare position: string;

  @Field({ description: 'Working period, e.g. 2024 — present' })
  declare period: string;

  @Field(() => [String], { description: 'Key achievements during this period' })
  declare achievements: string[];
}
