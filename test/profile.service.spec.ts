import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { ProfileService } from '../src/profile/profile.service';

const profileWithRelations = {
  id: 1,
  name: 'Илья',
  description: 'Backend TypeScript developer',
  links: [{ id: 1, label: 'GitHub', url: 'https://github.com/example' }],
  skills: [{ id: 1, name: 'TypeScript', category: 'Языки' }],
  experience: [
    {
      id: 1,
      company: 'Pet projects',
      position: 'Backend developer',
      period: '2024',
      achievements: [],
    },
  ],
  projects: [{ id: 1, name: 'Digital card', description: '', url: '', techStack: [] }],
};

describe('ProfileService', () => {
  let service: ProfileService;
  let prisma: { profile: { findFirst: jest.Mock } };

  beforeEach(async () => {
    prisma = { profile: { findFirst: jest.fn() } };

    const module = await Test.createTestingModule({
      providers: [ProfileService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(ProfileService);
  });

  it('returns the profile with all relations ordered by id', async () => {
    prisma.profile.findFirst.mockResolvedValue(profileWithRelations);

    const result = await service.getProfile();

    expect(result).toEqual(profileWithRelations);
    expect(prisma.profile.findFirst).toHaveBeenCalledWith({
      include: {
        links: { orderBy: { id: 'asc' } },
        skills: { orderBy: { id: 'asc' } },
        experience: { orderBy: { id: 'asc' } },
        projects: { orderBy: { id: 'asc' } },
      },
    });
  });

  it('throws NotFoundException when the database is empty', async () => {
    prisma.profile.findFirst.mockResolvedValue(null);

    await expect(service.getProfile()).rejects.toThrow(NotFoundException);
    await expect(service.getProfile()).rejects.toThrow('Profile not found');
  });
});
