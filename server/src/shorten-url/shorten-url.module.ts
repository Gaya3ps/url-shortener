import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortenUrl, ShortenUrlSchema } from './shorten-url.schema';
import { ShortenUrlService } from './shorten-url.service';
import { ShortenUrlController } from './shorten-url.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ShortenUrl.name, schema: ShortenUrlSchema }]),
    AuthModule,
  ],
  providers: [ShortenUrlService],
  controllers: [ShortenUrlController],
})
export class ShortenUrlModule {}
