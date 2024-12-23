import { Controller, Post, Get, Param, Body, UseGuards, Req, Res } from '@nestjs/common';
import { ShortenUrlService } from './shorten-url.service';
import { AuthGuard } from '../guards/auth.guard';
import { Response } from 'express';


@Controller('shorten-url')
export class ShortenUrlController {
  constructor(private readonly shortenUrlService: ShortenUrlService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createShortUrl(@Body('originalUrl') originalUrl: string, @Req() req: any) {
    console.log('Request received in createShortUrl');
    console.log('Headers:', req.headers);
    const userId = req.user.userId; 
    console.log(userId,"hello it is mee")
    return this.shortenUrlService.shortenUrl(originalUrl, userId);
  }

  @Get(':shortId')
  async redirectToOriginalUrl(
    @Param('shortId') shortId : string,
    @Res() res:Response,
  ) {
    const originalUrl = await this.shortenUrlService.getOriginalUrl(shortId);
    return res.redirect(originalUrl);
  }
}
