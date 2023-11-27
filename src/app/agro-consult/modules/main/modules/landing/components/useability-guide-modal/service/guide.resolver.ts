import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { GuideResponse } from '../model/guide.response';
import { GuideService } from './guide.service';

@Injectable({ providedIn: 'root' })
export class GuideResolver implements Resolve<GuideResponse[]> {
  /**
   *
   * @param guide$
   */
  constructor(private guide$: GuideService) {}

  /**
   *
   * @param route
   * @returns
   */
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<GuideResponse[]> | Promise<GuideResponse[]> | GuideResponse[] {
    return this.guide$
      .getGuide(route.params['type'])
      .pipe(map((result) => result.data));
  }
}
