import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';

@Component({
  selector: 'az-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksComponent {
  /**
   *
   */
  @Input()
  consultantInfo!: ResumeResponse;
}
