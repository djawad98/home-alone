import { Effort } from "./effort";
import { Ingredient } from "./ingredient";

export interface Food {
    id: number;
    label: string;
    ingredients: number[];
    metadata?: {
        effort: Effort,
        time: number
    }
}