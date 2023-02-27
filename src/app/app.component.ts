import { ChangeDetectionStrategy, Component, EnvironmentInjector } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

@Component({
  // +--------------------+
  // |                    |
  // |  COMPONENT CONFIG  |
  // |                    |
  // +--------------------+
  standalone: true,
  imports: [IonicModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,

  // +----------------------+
  // |                      |
  // |  COMPONENT TEMPLATE  |
  // |                      |
  // +----------------------+
  template: `
    <ion-app>
      <ion-router-outlet [environmentInjector]="environmentInjector"></ion-router-outlet>
    </ion-app>
  `,

  // +--------------------+
  // |                    |
  // |  COMPONENT STYLES  |
  // |                    |
  // +--------------------+
  styles: [
    `
  
    `
  ]
})

// +-------------------+
// |                   |
// |  COMPONENT LOGIC  |
// |                   |
// +-------------------+
export class AppComponent {

  constructor(public environmentInjector: EnvironmentInjector) { }

}
