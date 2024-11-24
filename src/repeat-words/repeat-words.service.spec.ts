import { Test, TestingModule } from '@nestjs/testing';
import { RepeatWordsService } from './repeat-words.service';

describe('RepeatWordsService', () => {
  let service: RepeatWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepeatWordsService],
    }).compile();

    service = module.get<RepeatWordsService>(RepeatWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
