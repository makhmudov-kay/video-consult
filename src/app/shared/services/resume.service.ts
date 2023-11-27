import { Injectable } from '@angular/core';
import {
  BaseResponse,
  BaseService,
  GridService,
  obj2FormData,
} from 'ngx-az-core';
import { Observable } from 'rxjs';
import { IsVisibleResume } from '../models/isVisible-resume.interface';
import { ResumeRequest } from '../models/resume.request';
import { ResumeResponse } from '../models/resume.response';

@Injectable({ providedIn: 'root' })
export class ResumeService extends GridService<ResumeResponse> {
  /**
   *
   */
  url: string;

  /**
   *
   * @param $baseService
   */
  constructor(protected override $baseService: BaseService) {
    super($baseService);
    this.url = 'resume';
  }

  /**
   *
   * @param request
   * @returns
   */
  add(request: ResumeRequest) {
    const formData = this.convertModelIntoFormData(request);
    return this.$baseService.post(`${this.url}`, formData);
  }

  /**
   *
   * @param request
   * @returns
   */
  edit(id: string ,request: ResumeRequest) {
    const formData = this.convertModelIntoFormData(request);
    return this.$baseService.post(`${this.url}/${id}`, formData);
  }

  /**
   *
   * @param id
   * @returns
   */
  getResumeById(id: string): Observable<BaseResponse<ResumeResponse>> {
    return this.$baseService.get<ResumeResponse>(`${this.url}/${id}`);
  }

  /**
   *
   * @param id
   * @returns
   */
  removeResume(id: number) {
    return this.$baseService.delete(`${this.url}/${id}`);
  }

  /**
   *
   * @param id
   * @param request
   * @returns
   */
  updateVisible(id: number, request: IsVisibleResume) {
    return this.$baseService.post(`${this.url}/${id}`, request);
  }

  /**
   *
   * @param model
   * @returns
   */
  private convertModelIntoFormData(model: ResumeRequest) {
    const formData = obj2FormData(model);
    return formData;
  }
}
