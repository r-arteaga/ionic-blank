import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { RecipeListComponent } from './ui/recipe-list.component';
import { RecipeService } from '../shared/data-access/recipe.service';
import { Recipe } from '../shared/util/model';
import { RecipeFilters } from './util/model';
import { IsFavSpec, NameSpec } from './util/filter.specification';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    RecipeListComponent
  ],
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Pilarecetas
        </ion-title>
        <ion-buttons slot="end">
          <ion-button routerLink="/recipe/null">
            <ion-icon slot="icon-only" name="add-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar color="primary">
        <ion-searchbar placeholder="Busca una receta..." (ionChange)="onSearchChange($any($event))" [debounce]="0" showCancelButton="never"/>
        <ion-buttons slot="end">
          <ion-button (click)="toggleFavQuery()">
            <ion-icon slot="icon-only" [name]="(filters$ | async)?.onlyFavs ? 'star' : 'star-outline'"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-recipe-list [recipes]="(filteredRecipes$ | async) ?? []" (recipeClicked)="onRecipeClicked($event)"></app-recipe-list>

      <ng-container *ngIf="loading$ | async">
        <ng-container *ngFor="let category of [].constructor(3)">
          <ion-skeleton-text animated style="width: 100%; height: 20px;"/>
          <ion-skeleton-text animated style="width: 90%; height: 40px;"/>
          <ion-skeleton-text animated style="width: 90%; height: 40px;"/>
          <ion-skeleton-text animated style="width: 90%; height: 40px;"/>
        </ng-container>
      </ng-container>
    </ion-content>
  `,

  styles: [
    `
    `
  ]
})
export class HomePage {

  // Deps
  private recipeService = inject(RecipeService)
  private router = inject(Router)

  // State
  recipes$: Observable<Recipe[]> = this.recipeService.recipes$
  loading$: Observable<boolean> = this.recipeService.isLoading$

  filters$ = new BehaviorSubject<RecipeFilters>({
    query: '',
    onlyFavs: false
  })

  filteredRecipes$: Observable<Recipe[]> = this.filters$.pipe(
    switchMap((filters: RecipeFilters) => this.recipes$.pipe(
      map((recipes: Recipe[]) => {
        const nameSpec = new NameSpec(this.filters$.value.query)
        const favSpec = new IsFavSpec(this.filters$.value.onlyFavs)
  
        return recipes.filter(recipe => nameSpec.isSatisfiedBy(recipe) && favSpec.isSatisfiedBy(recipe))
      }),
      map((recipes: Recipe[]) => recipes.sort((r1, r2) => r1.name > r2.name ? 1 : -1))
    ))
  )

  // Handlers
  onRecipeClicked(recipe: Recipe) {
    this.router.navigateByUrl(`/recipe/${recipe.id}`)
  }

  onSearchChange(ev: SearchbarCustomEvent) {
    const query = ev.detail.value?.toLowerCase() || ''
    this.filters$.next({ ...this.filters$.value, query })
  }

  toggleFavQuery() {
    const onlyFavs = !this.filters$.value.onlyFavs
    this.filters$.next({ ...this.filters$.value, onlyFavs })
  }

}
