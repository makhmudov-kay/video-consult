import { ResumeResponse } from './../../../../../shared/models/resume.response';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';

@Injectable({
  providedIn: 'root',
})
export class TopConsultantService {
  /**
   *
   */
  private url = 'top-consultant';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @param limit
   * @returns
   */
  getTopConsultants(limit?: number) {
    if (limit) {
      const param = new HttpParams().append('limit', limit);
      return this.$baseService.get<ResumeResponse[]>(`${this.url}`, param);
    }
    return this.$baseService.get<ResumeResponse[]>(`${this.url}`);
  }
}
