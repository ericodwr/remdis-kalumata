import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BaseComponent } from './components/base/base.component';
import {
  authNonLoginValidation,
  authValidation,
} from './validation/auth.validation';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [authValidation],
  },
  {
    path: 'poli',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/poli/poli.module').then((e) => e.PoliModule),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'patient',
    component: BaseComponent,
    loadChildren: () =>
      import('./pages/patient/patient.module').then((e) => e.PatientModule),
    canMatch: [authNonLoginValidation],
  },
  {
    path: 'dashboard',
    component: BaseComponent,
    children: [{ path: '', component: DashboardComponent }],
    canMatch: [authNonLoginValidation],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
