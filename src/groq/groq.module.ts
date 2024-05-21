import { Module } from '@nestjs/common';
import { GroqService } from './groq.service';
import { ConfigModule } from '@nestjs/config';
import { EmbeddingsService } from 'src/embeddings/embeddings.service';

@Module({
  providers: [GroqService, EmbeddingsService],
  imports: [ConfigModule],
  exports: [GroqService],
})
export class GroqModule {}
