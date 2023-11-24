import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ForgotPageComponent } from './forgot-page/forgot-page.component';
import { ForgotPageModule } from './forgot-page/forgot-page.module';
import { ValidationMailPageComponent } from './validation-mail-page/validation-mail-page.component';
import { ValidationMailPageModule } from './validation-mail-page/validation-mail-page.module';
import { ResetPageComponent } from './reset-page/reset-page.component';
import { ResetPageModule } from './reset-page/reset-page.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueilModule } from './accueil/accueil.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeDialogComponent } from './composants/type-dialog/type-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EquipementDialogComponent } from './composants/equipement-dialog/equipement-dialog.component';
import { ElectricienDialogComponent } from './composants/electricien-dialog/electricien-dialog.component';
import { AdministrateurDialogComponent } from './composants/administrateur-dialog/administrateur-dialog.component';
import { LogoutDialogComponent } from './composants/logout-dialog/logout-dialog.component';
import { ConnexionDialogComponent } from './composants/connexion-dialog/connexion-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    ForgotPageComponent,
    ValidationMailPageComponent,
    ResetPageComponent,
    AccueilComponent,
    TypeDialogComponent,
    EquipementDialogComponent,
    ElectricienDialogComponent,
    AdministrateurDialogComponent,
    LogoutDialogComponent,
    ConnexionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ForgotPageModule,
    ValidationMailPageModule,
    ResetPageModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccueilModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
