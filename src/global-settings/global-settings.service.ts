import { Injectable } from '@nestjs/common';
import { CreateGlobalSettingDto } from './dto/create-global-setting.dto';
import { UpdateGlobalSettingDto } from './dto/update-global-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalSettingsEntity } from './entities/global-setting.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class GlobalSettingsService {
  private readonly GLOBAL_SETTINGS_ID = 'c05ea447-c903-44b3-85dd-c2b7462c6b77';

  constructor(
    @InjectRepository(GlobalSettingsEntity)
    private readonly globalSettingsEntityRepository: Repository<GlobalSettingsEntity>,

    private readonly entityManager: EntityManager,
  ) {}

  async updateRepeatWordsDate() {
    const global_settings = await this.globalSettingsEntityRepository.findOne({
      where: { id: this.GLOBAL_SETTINGS_ID },
    });

    global_settings.lastRepeatingWordsDate = new Date();

    await this.entityManager.save(global_settings);

    return global_settings;
  }

  async updateRepeatPhrasesDate() {
    const global_settings = await this.globalSettingsEntityRepository.findOne({
      where: { id: this.GLOBAL_SETTINGS_ID },
    });

    global_settings.lastRepeatingPhrasesDate = new Date();

    await this.entityManager.save(global_settings);

    return global_settings;
  }

  async getLastRepeatingWordsDate() {
    return await this.globalSettingsEntityRepository.findOne({
      where: { id: this.GLOBAL_SETTINGS_ID },
      select: { lastRepeatingWordsDate: true },
    });
  }

  async getLastRepeatingPhraseDate() {
    return await this.globalSettingsEntityRepository.findOne({
      where: { id: this.GLOBAL_SETTINGS_ID },
      select: { lastRepeatingPhrasesDate: true },
    });
  }

  findAll() {
    return `This action returns all globalSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} globalSetting`;
  }

  update(id: number, updateGlobalSettingDto: UpdateGlobalSettingDto) {
    return `This action updates a #${id} globalSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalSetting`;
  }
}
