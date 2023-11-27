import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';
import { GuideResponse } from '../model/guide.response';

@Injectable({
  providedIn: 'root',
})
export class GuideService {
  /**
   *
   */
  private url = 'guide';

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
  getGuide(type?: string) {
    if (type) {
      const param = new HttpParams().append('type', type);
      return this.$baseService.get<GuideResponse[]>(`${this.url}`, param);
    }
    return this.$baseService.get<GuideResponse[]>(`${this.url}`);
  }
}
