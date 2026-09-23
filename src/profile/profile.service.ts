import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const include: Prisma.ProfileInclude = {
  links: { orderBy: { id: 'asc' } },
  skills: { orderBy: { id: 'asc' } },
  experience: { orderBy: { id: 'asc' } },
  projects: { orderBy: { id: 'asc' } },
};

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findFirst({ include });
    if (!profile) {
      throw new NotFoundException('Profile not found. Run the database seed.');
    }
    return profile;
  }

  getSkills() {
    return this.prisma.skill.findMany({ orderBy: { id: 'asc' } });
  }

  getProjects() {
    return this.prisma.project.findMany({ orderBy: { id: 'asc' } });
  }
}
