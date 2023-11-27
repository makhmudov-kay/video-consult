import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';
import { Review } from '../models/review.request';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  /**
   *
   */
  url = 'review';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   * 
   * @param request 
   * @returns 
   */
  addReview(request: Review) {
    return this.$baseService.post(`${this.url}`, request);
  }
}
