import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypEquipementComponent } from './typ-equipement.component';

const routes: Routes = [{path : '',component : TypEquipementComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypEquipementRoutingModule { }
