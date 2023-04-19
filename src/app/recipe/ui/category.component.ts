import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecipeForm } from 'src/app/shared/util/model';

@Component({
  standalone: true,
  selector: 'app-category-form',
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="recipeForm">
      <ion-header>
        <ion-toolbar color="primary">
          <ng-container *ngFor="let category of [['starter', 'Entrantes'], ['pasta','Pasta'], ['meat','Carnes'], ['fish', 'Pescados'], ['dessert', 'Postres'], ['', 'Otros']]">
            <ion-chip mode="ios" [outline]="true" (click)="setCategory(category[0])" [ngClass]="{'selected': categoryValue === category[0]}">
              <ion-label>{{ category[1] }}</ion-label>
            </ion-chip>
          </ng-container>
        </ion-toolbar>
      </ion-header>
    </form>
    `,

  styles: [`
    ion-toolbar {
      padding: 8px;
    }

    ion-chip {
      color: white;
      
      &.selected {
        background: var(--ion-color-secondary);
        font-weight: bold;
      }
    }
  `]
})
export class CategoryFormComponent {

  @Input() recipeForm!: FormGroup<RecipeForm>

  get categoryValue() { return this.recipeForm.controls.category.value }

  setCategory(category: string) {
    this.recipeForm.controls.category.setValue(category)
  }

}