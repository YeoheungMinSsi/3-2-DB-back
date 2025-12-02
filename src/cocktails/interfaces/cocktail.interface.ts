export interface Cocktail {
    cocktail_id: number;
    name_kr: string;
    name_en: string;
    category: string;
    ingredients: string[];
    ingredients_kr: string[];
    method_kr: string;
    calculated_abv?: string;
    total_volume_ml?: number; // sul.json에 있으므로 추가합니다.
    glassware?: string;
    garnish_kr?: string;
}