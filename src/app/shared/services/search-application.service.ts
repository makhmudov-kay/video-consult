import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BaseResponse,
  BaseService,
  GridModel,
  GridQuery,
  GridQueryConstants,
  GridService,
} from 'ngx-az-core';
import { map } from 'rxjs';
import { SearchApplicationResponse } from '../models/search-application.interface';

@Injectable({ providedIn: 'root' })
export class SearchApplicationsService extends GridService<SearchApplicationResponse> {
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
    this.url = 'self-application';
  }

  /**
   *
   * @param params
   * @returns
   */
  getApplicationWithoutResume(query: GridQuery) {
    return this.getGridData(query, `application`);
  }

  /**
   *
   * @returns
   */
  override mapToSetBaseResponse() {
    return map((result: BaseResponse<GridModel<SearchApplicationResponse>>) => {
      const firstData = this.baseResponse.data.data[0];
      const isFakeData = firstData && Object.keys(firstData).length == 0;

      this.baseResponse = {
        ...result,
        data: {
          ...result.data,
          data: isFakeData
            ? result.data.data
            : this.baseResponse.data.data.concat(result.data.data),
        },
      };
      if (!this.baseResponse.success) {
        this.baseResponse.data = GridQueryConstants.DEFAULT_DATA;
      }

      return result;
    });
  }
}
