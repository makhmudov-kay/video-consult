import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import SwiperCore, { Autoplay } from 'swiper';
import { ReviewResponse } from './model/review.response';
import { ReviewsService } from './service/reviews.service';

SwiperCore.use([Autoplay]);

@Component({
  selector: 'az-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent implements OnInit {
  /**
   *
   */
  reviews$!: Observable<ReviewResponse[]>;

  /**
   *
   * @param $reviews
   */
  constructor(private $reviews: ReviewsService) {}

  /**
   *
   */
  ngOnInit(): void {
    this.reviews$ = this.$reviews
      .getReviewsList()
      .pipe(map((result) => result.data));
  }
}
