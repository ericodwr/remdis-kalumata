import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  PatientResDto,
  PatientWithFilterDate,
} from '../dto/patient/PatientResDto';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private base: BaseService, private authService: AuthService) {}

  poliId: string | undefined = this.authService.getProfile()?.id;

  getAllPatient(): Observable<PatientResDto[]> {
    return this.base.get(`${environment.API_URL}/patient`);
  }

  getAllPatientWithFilterDate(
    prevData: Date
  ): Observable<PatientWithFilterDate> {
    return this.base.get(
      `${environment.API_URL}/patient-filter/?prevDate=${prevData}`
    );
  }
}
