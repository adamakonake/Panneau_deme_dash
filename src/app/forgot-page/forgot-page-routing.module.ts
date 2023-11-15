import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPageComponent } from './forgot-page.component';

const routes: Routes = [
  {
    path : '',
    component : ForgotPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPageRoutingModule { }
