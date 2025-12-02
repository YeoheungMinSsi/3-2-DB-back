import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { Cocktail } from './interfaces/cocktail.interface';
import * as path from 'path'; // 💡 Node.js의 path 모듈 import

// 💡 [최종 수정] Node.js의 require와 process.cwd()를 사용하여 절대 경로를 계산합니다.
// (현재 작업 디렉토리)/src/data/sul.json을 참조하도록 경로를 재설정합니다.
// NestJS는 TS 파일을 JS로 컴파일하여 dist 폴더에서 실행되므로, 소스 경로를 직접 지정해야 합니다.
const SUL_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'sul.json');
let sulData: any[] = [];
try {
    // 💡 [수정] require() 대신 안전하게 fs 모듈로 파일을 읽고 JSON 파싱을 수행합니다.
    // fs를 사용하면 빌드 시스템의 간섭을 피할 수 있습니다.
    const fs = require('fs');
    const jsonString = fs.readFileSync(SUL_DATA_PATH, 'utf8');
    const rawData = JSON.parse(jsonString);

    // .default가 아닌 순수 데이터 배열로 가정합니다.
    sulData = Array.isArray(rawData) ? rawData : [];

    // 에러 로그가 나오지 않도록 콘솔 로그 제거
} catch (error) {
    // 💡 실패 시 로그를 콘솔에 출력하여 경로 문제 디버깅을 돕습니다.
    console.error(`[CocktailsService] JSON load failed. Checked Path: ${SUL_DATA_PATH}`, error.message);
    sulData = [];
}


@Injectable()
export class CocktailsService {
    private readonly logger = new Logger(CocktailsService.name);
    private readonly cocktails: Cocktail[];

    // 💡 [핵심] 생성자에서 데이터를 로드하여 객체를 초기화하는 책임(Responsibility)을 수행합니다.
    constructor() {
        // 💡 [개선] JSON 로딩 로직을 try-catch 바깥으로 옮겼으므로, 여기서는 초기화만 진행합니다.
        try {
            const rawData = sulData;

            if (Array.isArray(rawData) && rawData.length > 0) { // 💡 항목 수 체크 추가
                // 💡 [핵심 로직] ID를 명시적으로 Number로 변환하여, findOne()에서 타입 불일치(string vs number) 문제를 원천 차단합니다.
                this.cocktails = rawData.map(item => ({
                    ...item,
                    // JSON 데이터의 cocktail_id가 문자열이더라도 Number로 강제 변환
                    cocktail_id: Number(item.cocktail_id)
                })) as Cocktail[];

                this.logger.log(`Cocktail data loaded successfully. Total items: ${this.cocktails.length}`);
            } else {
                this.cocktails = [];
                this.logger.warn('JSON file loaded, but array is empty or invalid. Check the file contents.');
            }
        } catch (error) {
            this.cocktails = [];
            this.logger.error(`Critical error during Service initialization.`, error.stack);
        }
    }

    findAll(): Cocktail[] {
        return this.cocktails;
    }

    /**
     * ID를 기반으로 특정 칵테일을 찾습니다.
     */
    findOne(id: number): Cocktail | undefined {
        // ID가 숫자로 보장되므로, 엄격한 비교 대신 느슨한 비교(==)를 유지하여 안전성을 높입니다.
        return this.cocktails.find(cocktail => cocktail.cocktail_id == id);
    }
}