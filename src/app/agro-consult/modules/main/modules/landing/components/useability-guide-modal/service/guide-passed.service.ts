import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';
import { GuideUpdate } from '../model/guide-update.request';

@Injectable({ providedIn: 'root' })
export class GuidePassedService {
  /**
   *
   */
  private url = 'profile';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @param profileId
   * @param body
   * @returns
   */
  updateProfileGuide(profileId: number, body: GuideUpdate) {
    return this.$baseService.put(`${this.url}/${profileId}`, body);
  }
}
