import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  {path : '',
  component : AccueilComponent,
  children : [
    {
      path: '',
      redirectTo: '/accueil/welcome-page',
      pathMatch: 'full',
    },
    {
      path : 'welcome-page',
      loadChildren : () => import("./welcome-page/welcome-page.module").then(m => m.WelcomePageModule)
    },
    {
      path : 'app-typ-equipement',
      loadChildren : () => import("./typ-equipement/typ-equipement.module").then(m => m.TypEquipementModule)
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
