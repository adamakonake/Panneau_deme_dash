import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WelcomePageModule } from './welcome-page/welcome-page.module';


@NgModule({
  declarations: [
    WelcomePageComponent
  ],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    WelcomePageModule
  ]
})
export class AccueilModule { }
