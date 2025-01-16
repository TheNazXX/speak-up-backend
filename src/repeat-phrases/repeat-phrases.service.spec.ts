import { Test, TestingModule } from '@nestjs/testing';
import { RepeatPhrasesService } from './repeat-phrases.service';

describe('RepeatPhrasesService', () => {
  let service: RepeatPhrasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepeatPhrasesService],
    }).compile();

    service = module.get<RepeatPhrasesService>(RepeatPhrasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
