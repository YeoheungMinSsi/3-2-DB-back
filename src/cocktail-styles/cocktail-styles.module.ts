import { Module } from '@nestjs/common';
import { CocktailStylesService } from './cocktail-styles.service';
import { CocktailStylesController } from './cocktail-styles.controller';

@Module({
  providers: [CocktailStylesService],
  controllers: [CocktailStylesController]
})
export class CocktailStylesModule {}
