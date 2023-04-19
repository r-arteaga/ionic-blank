import { Ingredient } from "src/app/shared/util/model";
import { RecipeBuilder } from "./recipe.builder";

export class RecipeBuilderDirector {
    private builder: RecipeBuilder;

    constructor(builder: RecipeBuilder) {
        this.builder = builder;
    }

    buildRecipe(name: string, category: string, isFav: boolean, ingredients: Ingredient[], steps: string[], portions: number) {
        this.builder.setName(name)
        this.builder.setCategory(category)
        this.builder.setFav(isFav)
        ingredients.forEach((ingredient: Ingredient) => this.builder.addIngredient(ingredient))
        steps.forEach((paso) => this.builder.addStep(paso));
    }
}