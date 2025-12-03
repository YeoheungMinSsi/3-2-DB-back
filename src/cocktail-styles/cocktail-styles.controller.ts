import { Controller, Get } from '@nestjs/common';
import { CocktailStylesService } from './cocktail-styles.service';
import { CocktailStyle } from './interfaces/cocktail-style.interface';

@Controller('cocktail-styles') // 이 경로가 API 엔드포인트의 기본 경로가 됩니다.
export class CocktailStylesController {

    // 생성자를 통해 서비스(Service)를 주입(Injection) 받습니다.
    constructor(private readonly cocktailStylesService: CocktailStylesService) { }

    @Get() // GET 요청을 처리하며, 최종 엔드포인트는 /cocktail-styles 가 됩니다.
    findAll(): CocktailStyle[] {
        // 서비스의 findAll 메서드를 호출하여 데이터를 반환합니다.
        return this.cocktailStylesService.findAll();
    }
}