import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [IonicModule, RouterTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
