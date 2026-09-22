import { PrismaClient } from '@prisma/client';

// Replace this object with real data when needed:
// upserts keyed by unique fields keep repeated seed runs idempotent.
const demoProfile = {
  key: 'demo-profile',
  name: 'Илья',
  description:
    'Начинающий backend/fullstack-разработчик. Пишу на TypeScript и Node.js, ' +
    'строю REST и GraphQL API, работаю с PostgreSQL и Prisma. Учу NestJS ' +
    'и применяю Docker в повседневной разработке.',
  links: [
    { label: 'GitHub', url: 'https://github.com/example' },
    { label: 'Telegram', url: 'https://t.me/example' },
    { label: 'Email', url: 'mailto:example@example.com' },
  ],
  skills: [
    { name: 'TypeScript' },
    { name: 'Node.js' },
    { name: 'NestJS' },
    { name: 'PostgreSQL' },
    { name: 'Prisma' },
    { name: 'GraphQL' },
    { name: 'Docker' },
  ],
  experience: [
    {
      company: 'Учебные проекты',
      position: 'Backend developer',
      period: '2024 — настоящее время',
      achievements: [
        'Разработал REST API для сервиса управления задачами на NestJS и Prisma',
        'Настроил CI и Docker-окружение для pet-проектов',
      ],
    },
    {
      company: 'Личная практика / open source',
      position: 'Fullstack developer',
      period: '2023 — 2024',
      achievements: [
        'Собрал несколько pet-проектов на TypeScript: API, интеграции, работа с БД',
        'Писал код в open source репозиториях и небольшие утилиты для себя',
      ],
    },
  ],
  projects: [
    { name: 'Task manager API', url: 'https://github.com/example/task-manager-api' },
    { name: 'Digital card backend', url: 'https://github.com/example/digital-card-backend' },
    { name: 'URL shortener', url: 'https://github.com/example/url-shortener' },
  ],
};

const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      name: demoProfile.name,
      description: demoProfile.description,
    },
    create: {
      name: demoProfile.name,
      description: demoProfile.description,
    },
  });

  await prisma.link.deleteMany({ where: { profileId: profile.id } });
  await prisma.skill.deleteMany({ where: { profileId: profile.id } });
  await prisma.experience.deleteMany({ where: { profileId: profile.id } });
  await prisma.project.deleteMany({ where: { profileId: profile.id } });

  await prisma.link.createMany({
    data: demoProfile.links.map((link) => ({ ...link, profileId: profile.id })),
  });
  await prisma.skill.createMany({
    data: demoProfile.skills.map((skill) => ({ ...skill, profileId: profile.id })),
  });
  await prisma.experience.createMany({
    data: demoProfile.experience.map((item) => ({ ...item, profileId: profile.id })),
  });
  await prisma.project.createMany({
    data: demoProfile.projects.map((project) => ({ ...project, profileId: profile.id })),
  });

  console.log(`Seeded profile "${profile.name}" (id=${profile.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
