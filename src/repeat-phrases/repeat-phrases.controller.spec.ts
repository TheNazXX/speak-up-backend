import { Test, TestingModule } from '@nestjs/testing';
import { RepeatPhrasesController } from './repeat-phrases.controller';
import { RepeatPhrasesService } from './repeat-phrases.service';

describe('RepeatPhrasesController', () => {
  let controller: RepeatPhrasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepeatPhrasesController],
      providers: [RepeatPhrasesService],
    }).compile();

    controller = module.get<RepeatPhrasesController>(RepeatPhrasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
