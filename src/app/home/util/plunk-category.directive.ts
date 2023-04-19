import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../../shared/util/model';

@Pipe({
    name: 'plunkCategory',
    standalone: true
})
export class PlunkCategoryPipe implements PipeTransform {
    transform(recipes: Recipe[]) {
        return [...new Set(recipes.map(recipe => recipe.category))]
    }
}