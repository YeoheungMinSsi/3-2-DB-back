// 칵테일 분류명 인터페이스
interface StylesName {
    kr: string;
    en: string;
}

// 칵테일 예시 인터페이스 (키 통일 후)
interface IbaCocktailExamples {
    kr: string[];
    en: string[];
}

// 메인 칵테일 분류 인터페이스
export interface CocktailStyle {
    serving_styles_id: number;
    styles_name: StylesName;
    feature: string[];
    iba_cocktail_examples: IbaCocktailExamples;
}