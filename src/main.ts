import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withHashLocation, withPreloading } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { RecipeService } from './app/shared/data-access/recipe.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ServiceWorkerModule } from '@angular/service-worker';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withPreloading(PreloadAllModules), withHashLocation()),
    provideHttpClient(),
    importProvidersFrom(
      IonicModule.forRoot({ }),
    ),
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })
    )
    // { 
    //   provide: APP_INITIALIZER,
    //   useFactory: loadRecipes, 
    //   deps: [RecipeService], 
    //   multi: true
    // }
  ]
});

defineCustomElements(window)

export function loadRecipes(recipeService: RecipeService) {
  return () => recipeService.load()
}