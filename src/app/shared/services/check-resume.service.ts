import { CheckHasResume } from './../../agro-consult/components/header/models/check-has-resume.interface';
import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckResumeService {
  /**
   *
   */
  private url = 'check-has-resume';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   * 
   * @returns 
   */
  checkHasResume(): Observable<BaseResponse<CheckHasResume>> {
    return this.$baseService.get<CheckHasResume>(`${this.url}`);
  }
}
