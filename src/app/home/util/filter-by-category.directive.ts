import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from 'src/app/shared/util/model';

@Pipe({
    name: 'filterByCategory',
    standalone: true
})
export class FilterByCategory implements PipeTransform {
    transform(recipes: Recipe[], category: string) {
        return recipes.filter(recipe => recipe.category === category)
    }
}