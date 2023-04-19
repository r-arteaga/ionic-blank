import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ItemReorderEventDetail } from '@ionic/angular';
import { IngredientForm } from 'src/app/shared/util/model';

@Component({
  standalone: true,
  selector: 'app-ingredients-form',
  imports: [
    NgIf,
    NgFor,
    IonicModule,
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="recipeForm">
        <ion-list formArrayName="ingredients" *ngIf="!isEmpty; else noIngredientTemplate">
            <ion-reorder-group (ionItemReorder)="reorderItems($any($event))" [disabled]="true">
                <ion-item *ngFor="let ingredient of ingredients.controls; let i = index; let isLast = last" [formGroupName]="i" [lines]="isLast ? 'none' : 'full'">
                    <ion-reorder slot="start"></ion-reorder>
                    <!-- <ion-input type="text" placeholder="Ingrediente" formControlName="name"></ion-input> -->
                    <ion-grid>
                      <ion-row>
                        <ion-col size="3.3" class="col-quality">
                          <ion-input class="input-quality" type="text" placeholder="Cantidad" formControlName="quantity"></ion-input>
                        </ion-col>
                        <ion-col size="6.7">
                          <ion-input type="text" placeholder="Ingrediente" formControlName="name"></ion-input>
                        </ion-col>
                        <ion-col size="2">
                          <ion-button (click)="removeIngredientClicked.emit(i)" fill="clear">
                            <ion-icon slot="icon-only" name="close-outline"></ion-icon>
                          </ion-button>
                        </ion-col>
                      </ion-row>
                    </ion-grid>
                </ion-item>
            </ion-reorder-group>
        </ion-list>
    </form>

    <ng-template #noIngredientTemplate>
      <div class="ion-text-center">
        <p>Algo llevará esta receta, ¿no? 🥕🥑🥩</p>
      </div>
    </ng-template>

    <ion-button (click)="newIngredientClicked.emit()" expand="full" fill="clear">Añadir ingrediente</ion-button>
    `,
  styles: [`
    ion-list {
      padding-top: 0;
      padding-bottom: 0;
      border-radius: 16px;
    }

    ion-grid, ion-row, ion-col {
      padding: 0;
      margin: 0;
    }

    .col-quality {
      display: flex;
      align-items: center;
    }

    .input-quality {
      border: 1px solid rgba(var(--ion-color-primary-rgb), 0.5);
      border-radius: 24px;
      max-width: 64px;
      text-align: center;
      font-size: 14px;
      --padding-top: 8px;
      --padding-bottom: 8px;
      color: var(--ion-color-primary);
    }
  `]
})
export class IngredientsFormComponent {
  
  @Input() recipeForm!: FormGroup

  @Output() newIngredientClicked = new EventEmitter<void>()
  @Output() removeIngredientClicked = new EventEmitter<number>()

  get ingredients(): FormArray<FormGroup<IngredientForm>> {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get isEmpty(): boolean {
    return this.ingredients.value.length === 0
  }

  reorderItems(event: CustomEvent<ItemReorderEventDetail>) {
    const itemMove = this.ingredients.controls.splice(event.detail.from, 1)[0];
    this.ingredients.controls.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
  }
}