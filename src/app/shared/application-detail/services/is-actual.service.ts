import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';

@Injectable({
  providedIn: 'root',
})
export class IsActualService {
  /**
   *
   */
  private url = 'is-actual';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @param id
   * @returns
   */
  checkIsActual(id: number) {
    return this.$baseService.post(`${this.url}/${id}`);
  }
}
