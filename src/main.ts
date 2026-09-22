import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));

  // PORT is injected by Railway and other PaaS providers.
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Business card page: http://localhost:${port}/`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
}

void bootstrap();
