
export interface Food {
    id: number;
    price: number;
    name: string;
    favourite: boolean;
    star: number;
    tags: string[];
    imageUrl: string;
    cookTime: string;
    origins: string;
    facts: string[];
    calories: number;
    nutrition: {
        fat: string;
        carbohydrates: string;
        protein: string;
        sodium: string;
        fiber: string;
    };
}
