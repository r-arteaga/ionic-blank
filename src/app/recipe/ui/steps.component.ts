import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ItemReorderEventDetail } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-steps-form',
  imports: [
    IonicModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  template: `
    <form [formGroup]="recipeForm" *ngIf="!isEmpty; else noIngredientTemplate">
      <ion-list formArrayName="steps">
        <ng-container  *ngFor="let step of steps.controls; let i = index; let isLast = last">
          <div class="step-header">
            <p class="step-number">Paso {{ i + 1 }}</p>
            <ion-button class="step-remove" (click)="removeStepClicked.emit(i)" fill="clear">
              <ion-icon slot="icon-only" name="close-outline"></ion-icon>
            </ion-button>
          </div>
          <ion-item [lines]="isLast ? 'none' : 'full'">
            <ion-textarea [autoGrow]="true" type="text" [formControlName]="i" placeholder="Describe el paso..."></ion-textarea>
          </ion-item>
        </ng-container>
      </ion-list>
    </form> 

    <ng-template #noIngredientTemplate>
      <div class="ion-text-center">
        <p>Ojala la receta se hiciera sola eh? 🫕</p>
      </div>
    </ng-template>

    <ion-button (click)="newStepClicked.emit()" expand="full" fill="clear">Añadir paso</ion-button>
    `,
  styles: [`   
    ion-list {
      --background: transparent;
      padding-top: 0;
      padding-bottom: 0;
      border-radius: 16px;
    }

    .step-header {
      height: auto;
      display: flex;
      align-items: center;
      position: relative;
    }

    .step-number {
      margin-left: 16px;
      font-weight: bold;
    }

    .step-remove {
      position: absolute;
      top: 2px;
      right: 8px;
    }

    ion-textarea {
      --padding-top: 0;
    }
  `]
})
export class StepsFormComponent {
  @Input() recipeForm!: FormGroup;

  @Output() newStepClicked = new EventEmitter<void>()
  @Output() removeStepClicked = new EventEmitter<number>()

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  get isEmpty(): boolean {
    return this.steps.value.length === 0
  }

  reorderItems(event: CustomEvent<ItemReorderEventDetail>) {
    const itemMove = this.steps.controls.splice(event.detail.from, 1)[0];
    this.steps.controls.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
  }
}