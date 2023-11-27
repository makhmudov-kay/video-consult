import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseResponse,
  BaseService,
  GridService,
  obj2FormData,
} from 'ngx-az-core';
import { ApplicationDetailResponse } from '../models/application-detail.response';
import { ApplicationRequest } from '../models/applications.request';
import { ApplicationVisibleRequest } from '../models/application-visible.interface';

@Injectable({ providedIn: 'root' })
export class ApplicationsService extends GridService {
  /**
   *
   */
  url = 'application';

  /**
   *
   * @param $baseService
   * @param datePipe
   */
  constructor(
    protected override $baseService: BaseService,
    private datePipe: DatePipe
  ) {
    super($baseService);
  }

  /**
   *
   * @param model
   * @returns
   */
  add(model: ApplicationRequest) {
    const formData = this.convertModelIntoFormData(model);
    return this.$baseService.post(`${this.url}`, formData);
  }

  /**
   *
   * @param id
   * @returns
   */
  getById(id: string): Observable<BaseResponse<ApplicationDetailResponse>> {
    return this.$baseService.get<ApplicationDetailResponse>(
      `${this.url}/${id}`
    );
  }

  /**
   *
   * @param id
   * @param request
   * @returns
   */
  updateApplication(id: number | string, request: ApplicationVisibleRequest) {
    return this.$baseService.put(`${this.url}/${id}`, request);
  }

  /**
   *
   * @param id
   * @returns
   */
  remove(id: number) {
    return this.$baseService.delete(`${this.url}/${id}`);
  }

  /**
   *
   * @param model
   * @returns
   */
  private convertModelIntoFormData(model: ApplicationRequest) {
    if (model.when_date) {
      model.when_date = this.datePipe.transform(model.when_date, 'yyyy-MM-dd');
    }
    const formData = obj2FormData(model);
    return formData;
  }
}
