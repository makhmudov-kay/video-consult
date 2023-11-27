import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'az-complete-modal',
  templateUrl: './complete-modal.component.html',
  styleUrls: ['./complete-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteModalComponent implements OnInit {
  /**
   *
   */
  @Input()
  isVisibleComplete!: boolean;

  /**
   *
   */
  @Input()
  resumeId!: number;

  /**
   *
   */
  @Output()
  isVisibleCompleteChange = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  completeApplication = new EventEmitter();

  /**
   *
   */
  form!: UntypedFormGroup;

  /**
   *
   */
  rate = 0;

  /**
   *
   * @param $review
   */
  constructor(private $review: ReviewService, private fb: FormBuilder) {}

  /**
   *
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null],
    });
  }

  /**
   *
   */
  closeCompleteModal() {
    this.isVisibleCompleteChange.emit(false);
    this.completeApplication.emit();
  }

  /**
   *
   */
  sendReview() {
    const request = this.form.getRawValue();
    request.resume_id = this.resumeId;

    if (this.rate > 0) {
      request.rating = this.rate;
    } else {
      request.rating = null;
    }

    this.$review.addReview(request).subscribe((e) => {
      this.completeApplication.emit();
    });
  }
}
