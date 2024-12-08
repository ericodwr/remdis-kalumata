import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { InsertResDto } from '../dto/InsertResDto';
import { PatientRemdisReqDto } from '../dto/patient-remdis/PatientRemdisReqDto';
import { BASE_URL } from '../constant/api.constant';
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
      `${BASE_URL}/patient-remdis/?poliId=${poliId}&id=${id}`
    );
  }

  getPasientAndAllRemdis(id: string | null): Observable<PatientResDto> {
    return this.base.get(`${BASE_URL}/patient-remdis-admin/?id=${id}`);
  }

  createPatientRemdis(data: PatientRemdisReqDto): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/patient-remdis`, data);
  }
}
