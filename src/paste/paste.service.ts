import { Injectable, Logger } from '@nestjs/common';
import { Paste } from './entities/paste.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class PasteService {
  private readonly logger = new Logger(PasteService.name);

  constructor(
    @InjectRepository(Paste)
    private pasteRepository: Repository<Paste>
  ) {}

  create(content: string) {
    return this.pasteRepository.save({ content });
  }

  findOne(id: string) {
    return this.pasteRepository.findOne(id);
  }

  remove(id: string): Promise<any> {
    return this.pasteRepository.delete(id);
  }

  @Interval(10000) // TODO: config
  async removeOutdated() {
    this.logger.log('Starting cleanup job');

    const { affected } = await this.pasteRepository
      .createQueryBuilder()
      .delete()
      .where('createdAt <= :currentDate', { currentDate: Date.now() - 60 * 60 * 1000 }) // TODO: config
      .execute();

    this.logger.log(`Cleanup job done. Deleted ${affected ?? 0} pastes.`);
  }
}
