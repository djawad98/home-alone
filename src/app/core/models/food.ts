import { Effort } from "./effort";

export interface Food {
    id: number;
    label: string;
    ingredients: number[];
    metadata?: {
        effort: Effort,
        time: number
    }
}
