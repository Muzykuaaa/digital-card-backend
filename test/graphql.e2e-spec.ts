import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaService } from '../src/prisma/prisma.service';
import { ProfileService } from '../src/profile/profile.service';
import { ProfileResolver } from '../src/profile/profile.resolver';

describe('GraphQL API (e2e)', () => {
  let app: INestApplication;
  const profile = {
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
        achievements: ['Built REST API'],
      },
    ],
    projects: [
      {
        id: 1,
        name: 'Digital card',
        description: '',
        url: 'https://github.com/x/y',
        techStack: ['NestJS'],
      },
    ],
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
          playground: false,
        }),
      ],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            profile: { findFirst: jest.fn().mockResolvedValue(profile) },
            skill: { findMany: jest.fn().mockResolvedValue(profile.skills) },
            project: { findMany: jest.fn().mockResolvedValue(profile.projects) },
          },
        },
        ProfileService,
        ProfileResolver,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const query = (body: string) =>
    request(app.getHttpServer()).post('/graphql').send({ query: body });

  it('returns the profile with nested relations', async () => {
    const res = await query(`query {
      profile {
        name
        skills { name }
        experience { company achievements }
        projects { name url }
      }
    }`);

    expect(res.status).toBe(200);
    expect(res.body.errors).toBeUndefined();
    expect(res.body.data).toEqual({
      profile: {
        name: 'Илья',
        skills: [{ name: 'TypeScript' }],
        experience: [{ company: 'Pet projects', achievements: ['Built REST API'] }],
        projects: [{ name: 'Digital card', url: 'https://github.com/x/y' }],
      },
    });
  });

  it('rejects unknown fields against the schema', async () => {
    const res = await query(`query { profile { nosuchfield } }`);

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('returns skills as a standalone query', async () => {
    const res = await query(`query { skills { name category } }`);

    expect(res.status).toBe(200);
    expect(res.body.data.skills).toEqual([{ name: 'TypeScript', category: 'Языки' }]);
  });

  it('returns projects as a standalone query', async () => {
    const res = await query(`query { projects { name url } }`);

    expect(res.status).toBe(200);
    expect(res.body.data.projects).toEqual([{ name: 'Digital card', url: 'https://github.com/x/y' }]);
  });

  it('exposes the schema types via introspection', async () => {
    const res = await query(`query { __schema { types { name } } }`);

    expect(res.status).toBe(200);
    const types = (res.body.data.__schema.types as { name: string }[]).map((t) => t.name);
    expect(types).toContain('Profile');
    expect(types).toContain('Skill');
  });
});
