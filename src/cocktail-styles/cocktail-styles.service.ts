// src/cocktail-styles/cocktail-styles.service.ts 내부

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CocktailStyle } from './interfaces/cocktail-style.interface';

@Injectable()
export class CocktailStylesService implements OnModuleInit {
    private styles: any[] = []; // (타입은 any로 임시 설정)

    onModuleInit() {
        this.loadStylesData();
    }

    private loadStylesData() {
        // 💡 [수정] 파일 경로: process.cwd() (프로젝트 루트) 에서 src/data 폴더로 지정
        const dataPath = path.join(process.cwd(), 'src', 'data', 'cocktail_serving_styles.json');

        try {
            if (!fs.existsSync(dataPath)) {
                console.error(`❌ ERROR: JSON file not found at the specified path: ${dataPath}`);
                return;
            }
            const jsonData = fs.readFileSync(dataPath, 'utf8');

            // JSON 데이터를 파싱
            this.styles = JSON.parse(jsonData) as any[];
            console.log(`✅ Loaded ${this.styles.length} cocktail styles from src/data.`);
        } catch (error) {
            console.error('❌ Failed to load cocktail styles JSON:', error);
            // JSON 문법 오류가 수정되었으므로, 이제는 파일 경로 문제일 가능성이 높습니다.
        }
    }

    /**
     * 모든 칵테일 분류 목록을 반환합니다.
     */
    findAll(): CocktailStyle[] {
        return this.styles;
    }
}