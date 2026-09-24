import { PrismaClient } from '@prisma/client';

// Replace this object with real data when needed:
// upsert keyed by profile id + full replace of child records
// keeps repeated seed runs idempotent.
const demoProfile = {
  name: 'Илья',
  description:
    'Backend TypeScript-разработчик. Строю API на NestJS и GraphQL, ' +
    'проектирую схемы БД в PostgreSQL/Prisma, разворачиваю сервисы в Docker. ' +
    'Интересна long-term разработка продуктов с понятной бизнес-логикой.',
  links: [
    { label: 'GitHub', url: 'https://github.com/Muzykuaaa' },
    { label: 'Telegram', url: 'https://t.me/chraaaack' },
    { label: 'Email', url: 'mailto:nnen15100@gmail.com' },
  ],
  skills: [
    { name: 'TypeScript', category: 'Языки' },
    { name: 'Node.js', category: 'Языки' },
    { name: 'NestJS', category: 'Backend' },
    { name: 'GraphQL', category: 'API' },
    { name: 'REST API', category: 'API' },
    { name: 'PostgreSQL', category: 'Базы данных' },
    { name: 'CockroachDB', category: 'Базы данных' },
    { name: 'Prisma', category: 'Базы данных' },
    { name: 'Docker', category: 'Инфраструктура' },
    { name: 'Git', category: 'Инфраструктура' },
    { name: 'S3 storage', category: 'Инфраструктура' },
    { name: 'CI/CD', category: 'Инфраструктура' },
    { name: 'Jest', category: 'Тестирование' },
    { name: 'Claude Code', category: 'Инструменты' },
  ],
  experience: [
    {
      company: 'Учебные и pet-проекты (backend)',
      position: 'TypeScript backend developer',
      period: '2024 — настоящее время',
      achievements: [
        'Спроектировал и реализовал несколько backend-сервисов на NestJS: REST и GraphQL API, аутентификация, роли, валидация DTO',
        'Настроил миграции Prisma и автоматический seed для всех проектов, чтобы окружение поднималось одной командой',
        'Покрываю код unit-тестами на Jest и интеграционными тестами API',
      ],
    },
    {
      company: 'Личные проекты и open source',
      position: 'Fullstack developer',
      period: '2023 — 2024',
      achievements: [
        'Собрал pet-проекты на TypeScript с PostgreSQL и Docker Compose: от схемы БД до CI',
        'Работал с файловым хранилищем по S3-совместимому API (загрузка/выдача файлов, пресайнед-ссылки)',
        'Писал мелкие правки и утилиты в open source репозиториях',
      ],
    },
  ],
  projects: [
    {
      name: 'Charity fund API',
      description: 'REST + GraphQL API платформы благотворительного фонда: кампании, донаты, отчётность',
      url: 'https://github.com/Muzykuaaa/charity-fund-api',
      techStack: ['NestJS', 'GraphQL', 'Prisma', 'PostgreSQL', 'Docker'],
      stars: 15,
    },
    {
      name: 'Media storage service',
      description: 'Сервис файлового хранилища на S3: загрузка, пресайнед-ссылки, метаданные в БД',
      url: 'https://github.com/Muzykuaaa/media-storage-service',
      techStack: ['NestJS', 'S3', 'Prisma', 'CockroachDB', 'Docker'],
      stars: 15,
    },
    {
      name: 'Digital card backend',
      description: 'Цифровая визитка: NestJS + GraphQL + Prisma, автодеплой базы при старте контейнера',
      url: 'https://github.com/Muzykuaaa/digital-card-backend',
      techStack: ['NestJS', 'GraphQL', 'Prisma', 'PostgreSQL', 'Docker'],
      stars: 15,
    },
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

  await prisma.$transaction([
    prisma.link.deleteMany({ where: { profileId: profile.id } }),
    prisma.skill.deleteMany({ where: { profileId: profile.id } }),
    prisma.experience.deleteMany({ where: { profileId: profile.id } }),
    prisma.project.deleteMany({ where: { profileId: profile.id } }),
  ]);

  await prisma.$transaction([
    prisma.link.createMany({
      data: demoProfile.links.map((link) => ({ ...link, profileId: profile.id })),
    }),
    prisma.skill.createMany({
      data: demoProfile.skills.map((skill) => ({ ...skill, profileId: profile.id })),
    }),
    prisma.experience.createMany({
      data: demoProfile.experience.map((item) => ({ ...item, profileId: profile.id })),
    }),
    prisma.project.createMany({
      data: demoProfile.projects.map((project) => ({ ...project, profileId: profile.id })),
    }),
  ]);

  console.log(`Seeded profile "${profile.name}" (id=${profile.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
