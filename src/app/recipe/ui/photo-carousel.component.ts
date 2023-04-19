import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController, ToastController } from '@ionic/angular';
import { LocalPhoto } from '../data-access/photo.service';
import { LongPressDirective } from 'src/app/shared/util/long-press.directive';

@Component({
  standalone: true,
  selector: 'app-photo-carousel',
  imports: [
    IonicModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  template: `
    <div class="backdrop" (click)="modalCtrl.dismiss()">
      <img [src]="photo.base64" (click)="$event.stopPropagation()"/> 
    </div>
  `,
  styles: [`
    .backdrop {
      height: 100%;
      display: flex;
      align-items: center;
    }
  `]
})
export class PhotoCarouselComponent {
  @Input() photo!: LocalPhoto
  modalCtrl = inject(ModalController)
}