import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Recipe } from 'src/app/shared/util/model';
import { PlunkCategoryPipe } from 'src/app/home/util/plunk-category.directive';
import { FilterByCategory } from '../util/filter-by-category.directive';
import { ThumbnailPipe } from '../util/thumbnail.pipe';

@Component({
    standalone: true,
    selector: 'app-recipe-list',
    imports: [
        CommonModule,
        IonicModule,
        FilterByCategory,
        PlunkCategoryPipe,
        ThumbnailPipe
    ],
    template: `
        <ion-list>
            <ng-container *ngFor="let category of [['starter', 'Entrantes'], ['pasta','Pasta'], ['meat','Carnes'], ['fish', 'Pescados'], ['dessert', 'Postres'], ['', 'Otros']]">
                <ion-item-divider *ngFor="let recipe of recipes | filterByCategory:category[0] | plunkCategory">
                    {{ category[1] }}
                </ion-item-divider>
                <ion-item button [detail]="false" *ngFor="let recipe of recipes | filterByCategory:category[0]; let i = index" (click)="recipeClicked.emit(recipe)" [lines]="i == (recipes | filterByCategory:category[0]).length - 1 ? 'none' : 'always'">
                    <ion-avatar slot="start">
                        <img [src]="recipe | thumbnail | async" />
                    </ion-avatar>
                    <ion-label>{{ recipe.name }}</ion-label>
                    <ion-icon class="fav-icon" *ngIf="recipe.isFav" slot="end" name="star"/>
                </ion-item>
            </ng-container>
        </ion-list>
    `,
    styles: [`
        ion-list {
            padding-top: 0;
        }

        ion-item-divider {
            --background: var(--ion-color-light);
            --color: var(--ion-color-dark);
            font-weight: bold;
        }

        .fav-icon {
            color: #ffd700
        }
    `]
})
export class RecipeListComponent {
    @Input() recipes: Recipe[] = [];
    @Output() recipeClicked = new EventEmitter<Recipe>();
}