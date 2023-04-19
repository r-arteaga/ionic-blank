import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocalPhoto } from '../data-access/photo.service';
import { LongPressDirective } from 'src/app/shared/util/long-press.directive';
import { MillisToDatePipe } from '../util/millis-to-date.pipe';

@Component({
  standalone: true,
  selector: 'app-photo-gallery',
  imports: [
    IonicModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    LongPressDirective,
    MillisToDatePipe
  ],
  template: `
    <ng-container *ngIf="(photos && photos.length > 0); else noPicsTemplate">

      <div class="container" *ngFor="let photo of photos">
        <img [src]="photo.base64" (click)="photoClicked.emit(photo)" longPress (onLongPress)="photoLongClicked.emit(photo)"/> 
        <ion-note>{{ photo.name | millis2date }}</ion-note>
      </div>

    </ng-container>

    <ion-button (click)="newPhotoClicked.emit()" expand="full" fill="clear" shape="round">Añadir foto</ion-button>

    <ng-template #noPicsTemplate>
      <div class="ion-text-center">
        <p>No olvides hacer fotos! 😋</p>
      </div>
    </ng-template>
    `,
  styles: [`
    .container {
      width: 33%;
      padding: 3px;
      display: inline-block;
    }

    img {
      border-radius: 16px;
    }
  `]
})
export class PhotoGalleryComponent {
  @Input() photos: LocalPhoto[] = [];

  @Output() newPhotoClicked = new EventEmitter<void>()
  @Output() photoClicked = new EventEmitter<LocalPhoto>()
  @Output() photoLongClicked = new EventEmitter<LocalPhoto>()
}