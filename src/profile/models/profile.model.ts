import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Link } from './link.model';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Project } from './project.model';

@ObjectType()
export class Profile {
  @Field(() => ID)
  declare id: number;

  @Field()
  declare name: string;

  @Field()
  declare description: string;

  @Field(() => [Link])
  declare links: Link[];

  @Field(() => [Skill])
  declare skills: Skill[];

  @Field(() => [Experience])
  declare experience: Experience[];

  @Field(() => [Project])
  declare projects: Project[];
}
