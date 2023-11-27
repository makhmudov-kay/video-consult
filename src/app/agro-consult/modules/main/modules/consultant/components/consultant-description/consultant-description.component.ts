import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';

@Component({
  selector: 'az-consultant-description',
  templateUrl: './consultant-description.component.html',
  styleUrls: ['./consultant-description.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantDescriptionComponent {
  /**
   *
   */
  @Input()
  consultantInfo!: ResumeResponse;

  /**
   * 
   */
  @Input()
  profileId!: number;
}
