import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReviewResponse } from '../model/review.response';

@Component({
  selector: 'az-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCardComponent {
  /**
   *
   */
  @Input()
  review!: ReviewResponse;
}
