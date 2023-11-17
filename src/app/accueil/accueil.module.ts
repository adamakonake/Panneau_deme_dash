import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WelcomePageModule } from './welcome-page/welcome-page.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { TypEquipementComponent } from './typ-equipement/typ-equipement.component';
import { TypEquipementModule } from './typ-equipement/typ-equipement.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    WelcomePageComponent,
    TypEquipementComponent,
  ],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    WelcomePageModule,
    NgApexchartsModule,
    TypEquipementModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AccueilModule { }
