import { Test, TestingModule } from '@nestjs/testing';
import { CocktailStylesService } from './cocktail-styles.service';

describe('CocktailStylesService', () => {
  let service: CocktailStylesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CocktailStylesService],
    }).compile();

    service = module.get<CocktailStylesService>(CocktailStylesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
