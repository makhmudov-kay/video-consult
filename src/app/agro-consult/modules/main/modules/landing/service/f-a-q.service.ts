import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseResponse, BaseService, Project } from 'ngx-az-core';
import { FAQResponse } from '../components/f-a-q/model/f-a-q.response';

@Injectable({ providedIn: 'root' })
export class FAQService {
  /**
   *
   */
  private url = 'faq';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  getFAQ(): Observable<BaseResponse<FAQResponse[]>> {
    return this.$baseService.get<FAQResponse[]>(
      `${this.url}/${Project.agroConsult}`
    );
  }
}
