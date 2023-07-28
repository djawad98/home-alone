import { Food } from "./food";

export interface SuggestedFood extends Food {
    resemblance: number;
}