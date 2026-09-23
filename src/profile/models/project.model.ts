import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Portfolio project' })
export class Project {
  @Field(() => ID)
  declare id: number;

  @Field({ description: 'Project name' })
  declare name: string;

  @Field({ description: 'One-line project summary' })
  declare description: string;

  @Field({ description: 'Repository or live project URL' })
  declare url: string;

  @Field(() => [String], { description: 'Technologies used' })
  declare techStack: string[];
}
