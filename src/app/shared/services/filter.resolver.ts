import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ResumeResponse } from '../models/resume.response';
import { MyResumeService } from './my-resume.service';

@Injectable({ providedIn: 'root' })
export class FilterResolver implements Resolve<ResumeResponse[]> {
  /**
   *
   * @param $myResume
   */
  constructor(private $myResume: MyResumeService) {}

  /**
   *
   * @param route
   * @returns
   */
  resolve(
    route: ActivatedRouteSnapshot
  ):
    | Observable<ResumeResponse[]>
    | Promise<ResumeResponse[]>
    | ResumeResponse[] {
    return this.$myResume.getMyResumeList().pipe(map((result) => result.data));
  }
}
