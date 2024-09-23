import { RouterModule, Routes } from '@angular/router';
import { ListPatientComponent } from './list/list-patient.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ButtonComponent } from '../../components/button/button.component';
import { CreatePatientComponent } from './create/create-patient.component';
import { DetailPatientComponent } from './detail/detail-patient.component';

const routes: Routes = [
  { path: '', component: ListPatientComponent },
  {
    path: 'create',
    component: CreatePatientComponent,
  },
  {
    path: 'detail/:id',
    component: DetailPatientComponent,
  },
];

@NgModule({
  declarations: [
    ListPatientComponent,
    CreatePatientComponent,
    DetailPatientComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonComponent,
    FormsModule,
  ],
  exports: [RouterModule],
})
export class PatientRouting {}
