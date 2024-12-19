import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShortenUrlDocument = ShortenUrl & Document;

@Schema()
export class ShortenUrl {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  shortId: string;

  @Prop({ required: true })
  userId: string; // Reference to the user who created the URL

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ShortenUrlSchema = SchemaFactory.createForClass(ShortenUrl);
