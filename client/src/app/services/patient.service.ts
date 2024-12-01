import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  PatientResDto,
  PatientWithFilterDate,
} from '../dto/patient/PatientResDto';
import { UpdatePatientReqDto } from '../dto/patient/UpdatePatientReqDto';
import { InsertResDto } from '../dto/InsertResDto';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private base: BaseService, private authService: AuthService) {}

  poliId: string | undefined = this.authService.getProfile()?.id;

  getAllPatient(): Observable<PatientResDto[]> {
    return this.base.get(`${environment.API_URL}/patient`);
  }

  updatePatient(data: UpdatePatientReqDto): Observable<InsertResDto> {
    return this.base.patch(`${environment.API_URL}/patient`, data);
  }

  deletePatient(id: string): Observable<InsertResDto> {
    return this.base.delete(`${environment.API_URL}/patient/?id=${id}`);
  }

  getAllPatientWithFilterDate(
    prevData: Date,
    createdBy: string = ''
  ): Observable<PatientWithFilterDate> {
    return this.base.get(
      `${environment.API_URL}/patient-filter/?prevDate=${prevData}&createdBy=${createdBy}`
    );
  }
}
