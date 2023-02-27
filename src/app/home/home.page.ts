import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  // +--------------------+
  // |                    |
  // |  COMPONENT CONFIG  |
  // |                    |
  // +--------------------+
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,

  // +----------------------+
  // |                      |
  // |  COMPONENT TEMPLATE  |
  // |                      |
  // +----------------------+
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Home
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="container">
        <span class="welcome-message">Welcome!</span>
      </div>
    </ion-content>
  `,

  // +--------------------+
  // |                    |
  // |  COMPONENT STYLES  |
  // |                    |
  // +--------------------+
  styles: [
    `
      #container {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
      }

      .welcome-message {
        font-weight: bold;
        font-size: 1.5rem;
      }
    `
  ]
})

// +-------------------+
// |                   |
// |  COMPONENT LOGIC  |
// |                   |
// +-------------------+
export class HomePage {

  constructor() { }

}
