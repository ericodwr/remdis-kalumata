import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { CreatePoliReqDto, PoliResDto } from '../dto/poli/PoliResDto';
import { BASE_URL } from '../constant/api.constant';
import { InsertResDto } from '../dto/InsertResDto';
import { UpdateResDto } from '../dto/UpdateResDto';

@Injectable({
  providedIn: 'root',
})
export class PoliService {
  constructor(private base: BaseService) {}

  getAllPoli(): Observable<PoliResDto[]> {
    return this.base.get(`${BASE_URL}/poli`, true);
  }

  createPoli(data: CreatePoliReqDto): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/poli`, data);
  }

  deletePoli(id: string): Observable<UpdateResDto> {
    return this.base.delete(`${BASE_URL}/poli/?id=${id}`);
  }

  editPoli(data: { id: string; nama: string }): Observable<UpdateResDto> {
    return this.base.patch(`${BASE_URL}/poli`, data);
  }
}
