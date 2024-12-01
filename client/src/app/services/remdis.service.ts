import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { InsertResDto } from '../dto/InsertResDto';
import { CreateRekamMedis } from '../dto/remdis/RemdisReqDto';
import { BASE_URL } from '../constant/api.constant';

@Injectable({
  providedIn: 'root',
})
export class RemdisService {
  constructor(private base: BaseService) {}

  createRemdis(data: CreateRekamMedis): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/remdis`, data);
  }
}
