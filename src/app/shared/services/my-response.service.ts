import { Injectable } from '@angular/core';
import { BaseService, GridService } from 'ngx-az-core';
import { SearchApplicationResponse } from '../models/search-application.interface';

@Injectable({ providedIn: 'root' })
export class MyResponsesService extends GridService<SearchApplicationResponse> {
  /**
   *
   */
  url = 'my-response';

  /**
   *
   * @param $baseService
   */
  constructor(protected override $baseService: BaseService) {
    super($baseService);
  }
}
