import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'A technology skill' })
export class Skill {
  @Field(() => ID)
  declare id: number;

  @Field({ description: 'Skill name, e.g. TypeScript' })
  declare name: string;

  @Field({ description: 'Grouping category, e.g. Languages, Backend, Databases' })
  declare category: string;
}
