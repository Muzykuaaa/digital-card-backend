import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare company: string;

  @Field()
  declare position: string;

  @Field()
  declare period: string;

  @Field(() => [String])
  declare achievements: string[];
}
