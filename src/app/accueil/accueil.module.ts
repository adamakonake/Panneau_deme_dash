import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WelcomePageModule } from './welcome-page/welcome-page.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { TypEquipementComponent } from './typ-equipement/typ-equipement.component';
import { TypEquipementModule } from './typ-equipement/typ-equipement.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { EquipementComponent } from './equipement/equipement.component';
import { EquipementModule } from './equipement/equipement.module';
import {MatSelectModule} from '@angular/material/select';
import { ElectricienComponent } from './electricien/electricien.component';
import { ElectricienModule } from './electricien/electricien.module';


@NgModule({
  declarations: [
    WelcomePageComponent,
    TypEquipementComponent,
    EquipementComponent,
    ElectricienComponent,
  ],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    WelcomePageModule,
    NgApexchartsModule,
    TypEquipementModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    EquipementModule,
    MatSelectModule,
    ElectricienModule
  ]
})
export class AccueilModule { }
