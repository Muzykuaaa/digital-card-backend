import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Link } from './link.model';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Project } from './project.model';

@ObjectType({ description: 'Digital business card of the developer' })
export class Profile {
  @Field(() => ID)
  declare id: number;

  @Field({ description: 'Full name' })
  declare name: string;

  @Field({ description: 'Short professional summary' })
  declare description: string;

  @Field(() => [Link], { description: 'Professional links (GitHub, Telegram, email)' })
  declare links: Link[];

  @Field(() => [Skill], { description: 'Skills grouped by category' })
  declare skills: Skill[];

  @Field(() => [Experience], { description: 'Work experience entries' })
  declare experience: Experience[];

  @Field(() => [Project], { description: 'Portfolio projects with repository URLs' })
  declare projects: Project[];
}
