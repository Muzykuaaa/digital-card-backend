import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare name: string;

  @Field()
  declare category: string;
}
