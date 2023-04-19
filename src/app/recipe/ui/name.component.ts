import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecipeForm } from 'src/app/shared/util/model';

@Component({
  standalone: true,
  selector: 'app-name-form',
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  template: `
    <!-- <h3>Nombre</h3> -->
    <form [formGroup]="recipeForm">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-input class="name" formControlName="name"></ion-input>
          <div class="container">
            <span class="portions-label">Raciones:</span> 
            <ion-input type="number" class="portions" formControlName="portions"/>
          </div>
          <!-- <ion-buttons slot="end">
            <ion-button (click)="toggleFav()">
              <ion-icon slot="icon-only" [name]="isFav ? 'star' : 'star-outline'"></ion-icon>
            </ion-button>
          </ion-buttons> -->
        </ion-toolbar>
      </ion-header>
    </form>
    `,

  styles: [`
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }

    .name {
      margin: 0;
      padding: 0;
      text-align: center;
      font-size: x-large;
      font-weight: bold;
      color: var(--ion-color-light);
    }

    .portions-label {

    }

    .portions {
      max-width: 40px;
      margin: 0;
      padding: 0;
      text-align: center;
      color: var(--ion-color-light);
    }
  `]
})
export class NameFormComponent {

  @Input() recipeForm!: FormGroup<RecipeForm>;

  @Output() favChanged = new EventEmitter<boolean>();

  get isFav() { return this.recipeForm.controls.isFav.value }

  toggleFav() {
    this.favChanged.emit(!this.isFav)
  }

}