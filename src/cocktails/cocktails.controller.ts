import { Controller, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
// 💡 [수정] 타입스크립트 오류(ts(1272)) 해결을 위해 'import type'을 사용합니다.
import type { Cocktail } from './interfaces/cocktail.interface';

@Controller('cocktails') // 기본 경로: /cocktails
export class CocktailsController {

    // 💡 [DI] CocktailsService를 주입받습니다. (Java/C#의 생성자 주입과 동일)
    constructor(private readonly cocktailsService: CocktailsService) { }

    /**
     * GET /cocktails (모든 칵테일 목록 반환)
     * @returns Cocktail[]
     */
    @Get()
    findAll(): Cocktail[] {
        return this.cocktailsService.findAll();
    }

    /**
     * GET /cocktails/:id (특정 칵테일 상세 정보 반환)
     * @param id 칵테일 ID
     * @returns Cocktail
     */
    @Get(':id')
    // 반환 타입에도 'type'을 사용하는 것이 안전합니다.
    findOne(@Param('id') id: string): Cocktail {
        // URL에서 받은 문자열 ID를 숫자로 변환합니다.
        const cocktailId = parseInt(id, 10);

        // 💡 [수정/추가] ID가 유효한 숫자인지 확인 (NaN 또는 0 이하 방지)
        if (isNaN(cocktailId) || cocktailId <= 0) {
            // 칵테일 ID가 잘못되었을 경우 400 Bad Request 반환
            throw new BadRequestException(`Invalid cocktail ID provided: ${id}`);
        }

        // 서비스에 숫자 ID를 전달합니다.
        const cocktail = this.cocktailsService.findOne(cocktailId);

        if (!cocktail) {
            // 칵테일이 없으면 HTTP 404 Not Found를 반환합니다. (예외 처리)
            throw new NotFoundException(`Cocktail with ID ${id} not found`);
        }

        return cocktail;
    }
}