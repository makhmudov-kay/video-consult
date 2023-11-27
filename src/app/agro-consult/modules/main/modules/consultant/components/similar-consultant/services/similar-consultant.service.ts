import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimilarConsultantService {
  /**
   *
   */
  private url = 'resume-shortlist';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @param categoryId
   * @param limit
   * @returns
   */
  getSimilarConsultant(
    categoryId: number,
    limit: number
  ): Observable<BaseResponse<ResumeResponse[]>> {
    const params = new HttpParams()
      .append('category_id', categoryId)
      .append('limit', limit);
    return this.$baseService.get<ResumeResponse[]>(`${this.url}`, params);
  }
}
