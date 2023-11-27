import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { Observable } from 'rxjs';
import { ResumeResponse } from '../models/resume.response';

@Injectable({ providedIn: 'root' })
export class MyResumeService {
  /**
   *
   */
  private url = 'my-resume';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  getMyResumeList(): Observable<BaseResponse<ResumeResponse[]>> {
    return this.$baseService.get<ResumeResponse[]>(`${this.url}`);
  }
}
