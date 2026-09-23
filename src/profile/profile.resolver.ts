import { Query, Resolver } from '@nestjs/graphql';
import { Profile } from './models/profile.model';
import { Skill } from './models/skill.model';
import { Project } from './models/project.model';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { description: 'Digital business card of the developer' })
  profile() {
    return this.profileService.getProfile();
  }

  @Query(() => [Skill], { description: 'All skills of the developer' })
  skills() {
    return this.profileService.getSkills();
  }

  @Query(() => [Project], { description: 'All portfolio projects' })
  projects() {
    return this.profileService.getProjects();
  }
}
