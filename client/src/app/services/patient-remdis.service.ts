import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { InsertResDto } from '../dto/InsertResDto';
import { PatientRemdisReqDto } from '../dto/patient-remdis/PatientRemdisReqDto';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { PatientResDto } from '../dto/patient/PatientResDto';

@Injectable({
  providedIn: 'root',
})
export class PatientRemdisService {
  constructor(private base: BaseService) {}

  getPasientAndRemdisByPoli(
    id: string | null,
    poliId: string | undefined
  ): Observable<PatientResDto> {
    return this.base.get(
      `${environment.API_URL}/patient-remdis/?poliId=${poliId}&id=${id}`
    );
  }

  createPatientRemdis(data: PatientRemdisReqDto): Observable<InsertResDto> {
    return this.base.post(`${environment.API_URL}/patient-remdis`, data);
  }
}
