import { Ingredient, Recipe } from "src/app/shared/util/model";

export class RecipeBuilder {
    private recipe: Recipe;

    constructor() {
        this.recipe = {
            id: crypto.randomUUID(),
            name: '',
            category: '',
            isFav: false,
            portions: 1,
            ingredients: [],
            steps: []
        }
    }

    setName(name: string) {
        this.recipe.name = name
        return this
    }

    setCategory(category: string) {
        this.recipe.category = category
        return this
    }

    setFav(isFav: boolean) {
        this.recipe.isFav = isFav
        return this
    }

    setPortions(portions: number) {
        this.recipe.portions = portions
        return this
    }

    addIngredient(ingredient: Ingredient) {
        this.recipe.ingredients.push(ingredient);
        return this;
    }

    addStep(step: string) {
        this.recipe.steps.push(step);
        return this;
    }

    getRecipe(): Recipe {
        return this.recipe;
    }
}