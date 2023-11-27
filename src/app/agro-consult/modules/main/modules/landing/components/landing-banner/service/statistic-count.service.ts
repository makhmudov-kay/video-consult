import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';
import { StatisticCount } from '../model/statistic-count.interface';

@Injectable({
  providedIn: 'root',
})
export class StatisticCountService {
  /**
   *
   */
  private url = 'statistic-count';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  getStatisticByService() {
    return this.$baseService.get<StatisticCount>(`${this.url}`);
  }
}
