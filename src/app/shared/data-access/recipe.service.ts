import { Injectable, inject } from '@angular/core';
import { Ingredient, IngredientForm, Recipe, RecipeForm } from '../util/model';
import { RecipeBuilder } from 'src/app/recipe/util/recipe.builder';
import { RecipeBuilderDirector } from 'src/app/recipe/util/recipe.director';
import { ApiService } from './api.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {

    private api = inject(ApiService)
    private nav = inject(NavController)
    private fb = inject(FormBuilder)

    #recipes = new BehaviorSubject<Recipe[]>([])
    recipes$ = this.#recipes.asObservable()
    
    #isLoading = new BehaviorSubject<boolean>(true)
    isLoading$ = this.#isLoading.asObservable()

    constructor() {
        this.load()
    }

    async load() {
        const recipes = await firstValueFrom(this.api.pull())
        this.#recipes.next(recipes)
        this.#isLoading.next(false)
    }

    buildRecipeForm(id: string | null | undefined): FormGroup<RecipeForm> {
        const recipe = (!id || id == null) ? undefined : this.getRecipe(id!)

        if (!recipe) {
            return this.fb.group({
                id: this.fb.nonNullable.control(''),
                name: this.fb.nonNullable.control('Nombre'),
                category: this.fb.nonNullable.control(''),
                isFav: this.fb.nonNullable.control(false),
                portions: this.fb.nonNullable.control(1),
                ingredients: this.fb.array<FormGroup<IngredientForm>>([]),
                steps: this.fb.nonNullable.array<string>([])
            })
        }
        else {
            const ingredientsForm: FormGroup<IngredientForm>[] = recipe.ingredients.map((ingredient: Ingredient) => this.fb.group({ 
                name: this.fb.nonNullable.control(ingredient.name), 
                quantity: this.fb.nonNullable.control(ingredient.quantity) 
            }))

            const stepsForm: FormControl<string>[] = recipe.steps.map((step: string) => this.fb.nonNullable.control(step))

            return this.fb.group({
                id: this.fb.nonNullable.control(recipe.id),
                name: this.fb.nonNullable.control(recipe.name),
                category: this.fb.nonNullable.control(recipe.category),
                isFav: this.fb.nonNullable.control(recipe.isFav),
                portions: this.fb.nonNullable.control(recipe.portions),
                ingredients: this.fb.array<FormGroup<IngredientForm>>(ingredientsForm),
                steps: this.fb.nonNullable.array<FormControl<string>>(stepsForm)
            })
        }
    }

    getAllRecipes() {
        return this.#recipes.value
    }

    getRecipe(id: string) {
        return this.#recipes.value.find(receta => receta.id === id)
    }

    async addRecipe(name: string, category: string, isFav: boolean,  ingredients: Ingredient[], steps: string[], portions: number): Promise<Recipe> {
        const builder = new RecipeBuilder();
        const director = new RecipeBuilderDirector(builder);
        director.buildRecipe(name, category, isFav, ingredients, steps, portions);
        const recipe = builder.getRecipe();
        this.#recipes.next([...this.#recipes.value, recipe])

        this.nav.pop()
        this.nav.navigateForward(`/recipe/${recipe.id}`)

        await this.pushChanges()

        return recipe
    }

    async updateRecipe(id: string, recipe: Recipe): Promise<Recipe> {
        let updatedRecipe: Recipe
        const index = this.#recipes.value.findIndex((recipe) => recipe.id === id);
        if (index !== -1) {
            const recipes = this.#recipes.value
            recipes[index] = {...recipe}
            this.#recipes.next([...recipes])
            updatedRecipe = recipe
            await this.pushChanges()
        } else {
            updatedRecipe = await this.addRecipe(recipe.name, recipe.category, recipe.isFav, recipe.ingredients, recipe.steps, 1)
        }

        return updatedRecipe
    }

    async deleteRecipe(id: string) {
        const recipes = this.#recipes.value.filter(recipe => recipe.id !== id)
        this.#recipes.next([...recipes])

        await this.pushChanges()
    }

    private async pushChanges() {
        await firstValueFrom(this.api.push(this.#recipes.value))
    }
}