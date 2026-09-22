import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  getProfile() {
    return this.prisma.profile.findFirst({
      include: {
        links: { orderBy: { id: 'asc' } },
        skills: { orderBy: { id: 'asc' } },
        experience: { orderBy: { id: 'asc' } },
        projects: { orderBy: { id: 'asc' } },
      },
    });
  }

  async getProfileOrFail() {
    const profile = await this.getProfile();
    if (!profile) {
      throw new NotFoundException('Profile not found. Run the database seed.');
    }
    return profile;
  }
}
