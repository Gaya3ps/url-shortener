import { Controller, Post, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ShortenUrlService } from './shorten-url.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('shorten-url')
export class ShortenUrlController {
  constructor(private readonly shortenUrlService: ShortenUrlService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createShortUrl(@Body('originalUrl') originalUrl: string, @Req() req: any) {
    const userId = req.user.userId; // Extract user ID from request
    return this.shortenUrlService.shortenUrl(originalUrl, userId);
  }

  @Get(':shortId')
  async redirectToOriginalUrl(@Param('shortId') shortId: string) {
    const originalUrl = await this.shortenUrlService.getOriginalUrl(shortId);
    return { originalUrl };
  }
}
