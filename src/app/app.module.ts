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
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueilModule } from './accueil/accueil.module';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    ForgotPageComponent,
    ValidationMailPageComponent,
    ResetPageComponent,
    AccueilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ForgotPageModule,
    ValidationMailPageModule,
    ResetPageModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccueilModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
