import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, Routes, withPreloading } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { appRoutes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

const providers = [
  provideRouter(appRoutes, withPreloading(PreloadAllModules)),
  importProvidersFrom(
    IonicModule.forRoot({})
  )
];

bootstrapApplication(AppComponent, { providers });