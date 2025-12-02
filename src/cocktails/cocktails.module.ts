import { Module } from '@nestjs/common';
import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';

@Module({
    // 이 모듈에서 사용할 컨트롤러를 등록합니다.
    controllers: [CocktailsController],
    // 이 모듈에서 사용할 서비스를 등록합니다.
    providers: [CocktailsService],
})
export class CocktailsModule { }