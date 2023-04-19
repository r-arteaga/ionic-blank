import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface Recipe {
    id: string;
    name: string;
    category: string;
    isFav: boolean;
    ingredients: Ingredient[];
    steps: string[];
    portions: number;
}

export interface IngredientForm {
    name: FormControl<string>,
    quantity: FormControl<string>
}

export interface RecipeForm {
    id: FormControl<string>
    name: FormControl<string>
    category: FormControl<string>
    isFav: FormControl<boolean>
    portions: FormControl<number>
    ingredients: FormArray<FormGroup<IngredientForm>>
    steps: FormArray<FormControl<string>>
}