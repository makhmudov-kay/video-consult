import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { Observable } from 'rxjs';
import { ReviewResponse } from '../model/review.response';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  /**
   *
   */
  private url = 'home-review';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  getReviewsList(): Observable<BaseResponse<ReviewResponse[]>> {
    return this.$baseService.get<ReviewResponse[]>(`${this.url}`);
  }
}
