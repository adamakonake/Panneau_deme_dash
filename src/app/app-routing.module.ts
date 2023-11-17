import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AuthGuardService } from './guard/auth-guard.service';

const routes: Routes = [
  {
    path : '',
    component : ConnexionComponent
  },
  {
    path : 'forgot-page',
    loadChildren : () => import('./forgot-page/forgot-page.module').then(m => m.ForgotPageModule)
  },
  {
    path : 'validation-mail-page',
    loadChildren : () => import('./validation-mail-page/validation-mail-page.module').then(m => m.ValidationMailPageModule)
  },
  {
    path : 'reset-page',
    loadChildren : () => import('./reset-page/reset-page.module').then(m => m.ResetPageModule)
  },
  {
    path : 'accueil',
    loadChildren : () => import('./accueil/accueil.module').then(m => m.AccueilModule),
    canActivate : [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
