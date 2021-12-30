import { Module } from '@nestjs/common';
import { PasteController } from './paste.controller';
import { Paste } from './entities/paste.entity';
import { PasteService } from './paste.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Paste])],
  controllers: [PasteController],
  providers: [PasteService],
})
export class PasteModule {}
