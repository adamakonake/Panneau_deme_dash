import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidationMailPageComponent } from './validation-mail-page.component';

const routes: Routes = [
  {
    path : '',
    component : ValidationMailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidationMailPageRoutingModule { }
