import { NgModule } from '@angular/core';
import { PatientRouting } from './patient.routing';

@NgModule({
  imports: [PatientRouting],
  exports: [PatientRouting],
})
export class PatientModule {}
