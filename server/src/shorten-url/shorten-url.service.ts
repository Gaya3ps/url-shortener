import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { ShortenUrl, ShortenUrlDocument } from './shorten-url.schema';

@Injectable()
export class ShortenUrlService {
  constructor(
    @InjectModel(ShortenUrl.name) private readonly shortenUrlModel: Model<ShortenUrlDocument>,
  ) {}

  async shortenUrl(originalUrl: string, userId: string): Promise<ShortenUrl> {
    const shortId = nanoid(8); // Generate a unique short ID (8 characters)
    const newShortenUrl = new this.shortenUrlModel({
      originalUrl,
      shortId,
      userId,
    });
    return newShortenUrl.save();
  }

  async getOriginalUrl(shortId: string): Promise<string> {
    const urlRecord = await this.shortenUrlModel.findOne({ shortId });
    if (!urlRecord) {
      throw new NotFoundException('Shortened URL not found');
    }
    return urlRecord.originalUrl;
  }
}

