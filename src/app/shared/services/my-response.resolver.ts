import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GridModel } from 'ngx-az-core';
import { map, Observable } from 'rxjs';
import { SearchApplicationResponse } from '../models/search-application.interface';
import { MyResponsesService } from './my-response.service';

@Injectable({ providedIn: 'root' })
export class MyResponsesResolver
  implements Resolve<GridModel<SearchApplicationResponse>>
{
  /**
   *
   * @param $data
   */
  constructor(private $data: MyResponsesService) {}

  /**
   *
   * @param route
   * @returns
   */
  resolve(
    route: ActivatedRouteSnapshot
  ):
    | Observable<GridModel<SearchApplicationResponse>>
    | Promise<GridModel<SearchApplicationResponse>>
    | GridModel<SearchApplicationResponse> {
    return this.$data
      .getGridData(this.$data.query)
      .pipe(map((result) => result.data));
  }
}
