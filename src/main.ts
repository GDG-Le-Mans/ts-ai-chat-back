import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmbeddingsService } from './embeddings/embeddings.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin: configService.get<string>("ALLOWED_ORIGIN",'http://localhost:4200'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const embeddingsService = app.get<EmbeddingsService>(EmbeddingsService);
  await embeddingsService.embed();
  await app.listen(3000);
}
bootstrap();
