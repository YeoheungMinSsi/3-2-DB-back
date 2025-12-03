import { Test, TestingModule } from '@nestjs/testing';
import { CocktailStylesController } from './cocktail-styles.controller';

describe('CocktailStylesController', () => {
  let controller: CocktailStylesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CocktailStylesController],
    }).compile();

    controller = module.get<CocktailStylesController>(CocktailStylesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
