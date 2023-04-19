import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActionSheetController, AlertController, IonicModule, ModalController } from '@ionic/angular';
import { RecipeService } from '../shared/data-access/recipe.service';
import { IngredientsFormComponent } from './ui/ingredients.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientForm, Recipe, RecipeForm } from '../shared/util/model'
import { NameFormComponent } from './ui/name.component';
import { StepsFormComponent } from './ui/steps.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryFormComponent } from './ui/category.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LocalPhoto, PhotoService } from './data-access/photo.service';
import { PhotoGalleryComponent } from './ui/photo-thumbs.component';
import { PhotoCarouselComponent } from './ui/photo-carousel.component';
import { SectionLabelComponent } from './ui/sectionl-label.component';
import { Share } from '@capacitor/share';

@Component({
  // Config
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IngredientsFormComponent,
    ReactiveFormsModule,
    NameFormComponent,
    StepsFormComponent,
    CategoryFormComponent,
    PhotoGalleryComponent,
    SectionLabelComponent
  ],
  selector: 'app-recipe',
  changeDetection: ChangeDetectionStrategy.OnPush,

  // Template
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button (click)="toggleFav()">
            <ion-icon slot="icon-only" [name]="isFav ? 'star' : 'star-outline'"></ion-icon>
          </ion-button>
          <ion-button (click)="updateRecipe()">
            <ion-icon slot="icon-only" name="save-outline"></ion-icon>
          </ion-button>
          <ion-button (click)="deleteRecipe()" [disabled]="!recipeFormId">
            <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <app-name-form [recipeForm]="recipeForm"/>
    <app-category-form [recipeForm]="recipeForm"/>

    <ion-content class="ion-padding">
      <app-section-label name="Ingredientes"/>
      <app-ingredients-form [recipeForm]="recipeForm" (newIngredientClicked)="onAddIngredientClicked()" (removeIngredientClicked)="onRemoveIngredientClicked($any($event))"/>
      <app-section-label name="Elaboración"/>
      <app-steps-form [recipeForm]="recipeForm" (newStepClicked)="onAddStepClicked()" (removeStepClicked)="onRemoveStepClicked($any($event))"/>
      <app-section-label name="Galería"/>
      <app-photo-gallery [photos]="(recipePhotos$ | async) || []" (photoClicked)="onPhotoClicked($any($event))" (newPhotoClicked)="onNewPhotoClicked()" (photoLongClicked)="onPhotoLongClicked($any($event))"/>
    </ion-content>
  `,

  // Styles
  styles: [
    `
      ion-content {
        --background: var(--ion-color-light)
      }
    `
  ]
})
export class RecipePage {

  // Deps
  private recipeService = inject(RecipeService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private alertCtrl = inject(AlertController)
  private fb = inject(FormBuilder)
  private photos = inject(PhotoService)
  private modalCtrl = inject(ModalController)
  private actionCtrl = inject(ActionSheetController)

  get isFav() { return this.recipeForm.controls.isFav.value }

  // State
  recipeForm: FormGroup<RecipeForm> = this.recipeService.buildRecipeForm(this.route.snapshot.paramMap.get('id'))
  get recipeFormId() { return this.recipeForm.controls['id'].value }
  recipePhotos$ = this.photos.recipePhotos$


  // Lifecycle
  ngOnInit() {
    this.photos.loadPhotos(this.recipeFormId)
  }

  // Handlers
  toggleFav() {
    this.recipeForm.controls.isFav.setValue(!this.isFav)
  }

  updateRecipe() {
    const recipe: Recipe = this.recipeForm!.value as Recipe
    this.recipeService.updateRecipe(recipe.id, recipe)
    this.router.navigateByUrl('/home', { replaceUrl: true })
  }

  async deleteRecipe() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Seguro que quieres eliminar esta receta?',
      buttons: [
        'No',
        {
          text: 'Sí',
          handler: () => {
            const recipe: Recipe = this.recipeForm!.value as Recipe
            this.recipeService.deleteRecipe(recipe.id)
            this.router.navigateByUrl('/home', { replaceUrl: true })
          }
        }
      ]
    });

    await alert.present();
  }

  onAddIngredientClicked() {
    const newIngredientForm: FormGroup<IngredientForm> = this.fb.group({
      name: this.fb.nonNullable.control('', [Validators.required]),
      quantity: this.fb.nonNullable.control('', [Validators.required])
    })

    this.recipeForm.controls.ingredients.push(newIngredientForm)
  }

  onRemoveIngredientClicked(index: number) {
    this.recipeForm.controls.ingredients.removeAt(index);
  }

  onAddStepClicked() {
    const newStep: FormControl<string> = this.fb.nonNullable.control('', Validators.required)
    this.recipeForm.controls.steps.push(newStep)
  }

  onRemoveStepClicked(index: number) {
    this.recipeForm.controls.steps.removeAt(index);
  }

  async onPhotoClicked(photo: LocalPhoto) {
    const modal = await this.modalCtrl.create({
      component: PhotoCarouselComponent,
      cssClass: 'img-carousel',
      componentProps: {
        photo
      }
    })

    await modal.present()
  }

  async onNewPhotoClicked() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      })

      this.photos.addRecipePhoto(this.recipeFormId, image.dataUrl!)
    } catch (error) {
      // Cancelled
    }
  }

  async onPhotoLongClicked(photo: LocalPhoto) {
    const sheet = await this.actionCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          handler: () => this.sharePhoto(photo)
        },
        {
          text: 'Eliminar',
          handler: () => this.removePhoto(photo)
        }
      ]
    })

    await sheet.present()
  }

  private async sharePhoto(photo: LocalPhoto) {
    const result = await this.photos.getPhoto(this.recipeFormId, photo.name)
    if(result) {
      console.log(result)
      await Share.share({
        title: 'Compartir',
        files: [result.uri]
      })
    }
  }

  private async removePhoto(photo: LocalPhoto) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Seguro que quieres eliminar esta foto?',
      buttons: [
        'No',
        {
          text: 'Sí',
          handler: () => this.photos.deleteRecipePhoto(this.recipeFormId, photo)
        }
      ]
    });

    await alert.present();
  }

}
