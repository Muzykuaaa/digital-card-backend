import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare label: string;

  @Field()
  declare url: string;
}
