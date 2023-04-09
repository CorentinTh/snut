import { Body, Controller, Get, NotFoundException, Param, Post, Render, Res, UseFilters, UseGuards } from '@nestjs/common';
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
    return res.redirect(`/p/${id}`);
  }

  @Get('p/:id')
  @Render('view')
  @UseFilters(new NotFoundFilter())
  @UseGuards(ThrottlerGuard)
  async findOne(@Param('id') id: string, @Res() res) {
    const paste = await this.pasteService.findOne(id);

    if (!paste) {
      throw new NotFoundException();
    }

    res.setHeader('X-Robots-Tag', 'noindex, follow');

    return { paste };
  }
}
