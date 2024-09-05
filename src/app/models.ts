export interface Ingredient {
    _id?: any
    name: string;
    image?: string;
}

export interface RecipeIngredient {
    ingredient: Ingredient;
    compatibility: number;
    quantity: number;
    unity: string;
}

export interface Recipe {
    _id?: any;
    name: string;
    descriptions: string;
    image?: string;
    time?: string;
    method: Array<{ stepNumber: number, stepDescription: string }>;
    rating: number;
    ingredients: RecipeIngredient[];
    createdAt?: Date;
}