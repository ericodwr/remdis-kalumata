import { RouterModule, Routes } from '@angular/router';
import { ListPoliComponent } from './list/list-poli.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ButtonComponent } from '../../components/button/button.component';
import { CreatePoliComponent } from './create/create-poli.component';

const routes: Routes = [
  {
    path: '',
    component: ListPoliComponent,
  },
  {
    path: 'create',
    component: CreatePoliComponent,
  },
];

@NgModule({
  declarations: [ListPoliComponent, CreatePoliComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonComponent,
  ],
  exports: [RouterModule],
})
export class PoliRouting {}
