import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare name: string;

  @Field()
  declare description: string;

  @Field()
  declare url: string;

  @Field(() => [String])
  declare techStack: string[];

  @Field(() => Int)
  declare stars: number;
}
