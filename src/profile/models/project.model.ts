import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare name: string;

  @Field()
  declare url: string;
}
