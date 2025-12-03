import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CocktailsModule } from './cocktails/cocktails.module'; // 💡 CocktailsModule 임포트
import { CocktailStylesModule } from './cocktail-styles/cocktail-styles.module';

@Module({
  imports: [CocktailsModule, CocktailStylesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
