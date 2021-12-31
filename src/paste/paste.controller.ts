import { CreatePasteDto } from './dto/paste.dto';
import { Controller, Get, Post, Render, Param, Body, Res, NotFoundException, UseFilters } from '@nestjs/common';
import { NotFoundFilter } from '../filters/not-found.filter';
import { PasteService } from './paste.service';

@Controller()
export class PasteController {
  constructor(private readonly pasteService: PasteService) {}

  @Get()
  @Render('create')
  root() {}

  @Post('create')
  async create(@Body() { content }: CreatePasteDto, @Res() res) {
    const { id } = await this.pasteService.create(content);
    return res.redirect(`/p/${id}`);
  }

  @Get('p/:id')
  @Render('view')
  @UseFilters(new NotFoundFilter())
  async findOne(@Param('id') id: string) {
    const paste = await this.pasteService.findOne(id);

    if (!paste) {
      throw new NotFoundException();
    }

    res.setHeader('X-Robots-Tag', 'noindex, follow');

    return paste;
  }
}
