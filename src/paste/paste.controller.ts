import { Body, Controller, Get, NotFoundException, Param, Post, Query, Render, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { NotFoundFilter } from '../filters/not-found.filter';
import { CreatePasteDto } from './dto/paste.dto';
import { PasteService } from './paste.service';

@Controller()
export class PasteController {
  constructor(private readonly pasteService: PasteService) {}

  @Get()
  @Render('create')
  root() {}

  @Post('create')
  @UseGuards(ThrottlerGuard)
  async create(@Body() { content }: CreatePasteDto, @Res() res) {
    const { id } = await this.pasteService.create(content);
    return res.redirect(`/p/${id}?created=true`);
  }

  @Get('p/:id')
  @Render('view')
  @UseFilters(new NotFoundFilter())
  @UseGuards(ThrottlerGuard)
  async findOne(@Param('id') id: string, @Query() query, @Req() req, @Res() res) {
    const paste = await this.pasteService.findOne(id);
    const isJustCreated = 'created' in query;
    const url = `${req.protocol}://${req.get('Host')}${req.originalUrl.split('?')[0]}`;

    if (!paste) {
      throw new NotFoundException();
    }

    res.setHeader('X-Robots-Tag', 'noindex, follow');

    return { paste, isJustCreated, url };
  }
}
