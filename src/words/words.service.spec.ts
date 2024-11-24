import { Test, TestingModule } from '@nestjs/testing';
import { WordsService } from './words.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateWordDto } from './dtos/create-word-dto';

const mockWordModel = {
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(null),
  create: jest.fn().mockResolvedValue({ en: 'test', translate: ['тест'] }),
};

describe('WordsService', () => {
  let service: WordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordsService,
        {
          provide: getModelToken('Word'),
          useValue: mockWordModel,
        },
      ],
    }).compile();

    service = module.get<WordsService>(WordsService);
  });

  describe('create', () => {
    it('should create a word', async () => {
      const words: CreateWordDto = { en: 'test', translate: ['тест'] };
      const result = await service.create(words);
      expect(result).toEqual({ en: 'test', translate: ['тест'] });
      expect(mockWordModel.create).toHaveBeenCalledWith(words);
      expect(mockWordModel.create).toHaveBeenCalledTimes(1);
    });
  });
});
