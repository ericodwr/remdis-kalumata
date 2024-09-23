import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { CreatePoliReqDto, PoliResDto } from '../dto/poli/PoliResDto';
import { environment } from '../../environments/environment.development';
import { InsertResDto } from '../dto/InsertResDto';
import { UpdateResDto } from '../dto/UpdateResDto';

@Injectable({
  providedIn: 'root',
})
export class PoliService {
  constructor(private base: BaseService) {}

  getAllPoli(): Observable<PoliResDto[]> {
    return this.base.get(`${environment.API_URL}/poli`, true);
  }

  createPoli(data: CreatePoliReqDto): Observable<InsertResDto> {
    return this.base.post(`${environment.API_URL}/poli`, data);
  }

  deletePoli(id: string): Observable<UpdateResDto> {
    return this.base.delete(`${environment.API_URL}/poli/?id=${id}`);
  }
}
