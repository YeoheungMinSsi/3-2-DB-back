// 3-2-DB-back/src/cocktail-styles/interfaces/cocktail-style.interface.ts

// 칵테일 분류명 인터페이스
interface StylesName {
    kr: string;
    en: string;
}

// 칵테일 예시 인터페이스
interface IbaCocktailExamples {
    kr: string[];
    en: string[];
}

// 💡 [핵심] 메인 칵테일 분류 인터페이스를 export합니다.
export interface CocktailStyle {
    serving_styles_id: number;
    styles_name: StylesName;
    feature: string[];
    iba_cocktail_examples: IbaCocktailExamples;
}