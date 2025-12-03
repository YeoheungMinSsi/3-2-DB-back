import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CocktailStyle } from './interfaces/cocktail-style.interface';

@Injectable()
// OnModuleInit을 구현하여 모듈이 초기화될 때 데이터를 로드합니다.
export class CocktailStylesService implements OnModuleInit {
    private styles: CocktailStyle[] = [];

    onModuleInit() {
        this.loadStylesData();
    }

    private loadStylesData() {
        // 💡 JSON 파일 경로 설정: 프로젝트 루트의 'data' 폴더를 가정합니다.
        const dataPath = path.join(process.cwd(), 'data', 'cocktail_serving_styles.json');

        try {
            if (!fs.existsSync(dataPath)) {
                console.error(`ERROR: JSON file not found at ${dataPath}`);
                return;
            }
            const jsonData = fs.readFileSync(dataPath, 'utf8');

            // JSON 데이터를 파싱하고 멤버 변수에 저장합니다.
            this.styles = JSON.parse(jsonData) as CocktailStyle[];
            console.log(`✅ ${this.styles.length} cocktail styles loaded.`);
        } catch (error) {
            console.error('Failed to load cocktail styles JSON:', error);
            // 로딩 실패 시 서버 종료 대신 에러를 기록하고 빈 배열 유지
        }
    }

    /**
     * 모든 칵테일 분류 목록을 반환합니다.
     */
    findAll(): CocktailStyle[] {
        return this.styles;
    }
}