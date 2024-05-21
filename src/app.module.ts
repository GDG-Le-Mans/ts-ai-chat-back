import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GroqModule } from './groq/groq.module';
import { EmbeddingsService } from './embeddings/embeddings.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GroqModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [EmbeddingsService],
})
export class AppModule {}
