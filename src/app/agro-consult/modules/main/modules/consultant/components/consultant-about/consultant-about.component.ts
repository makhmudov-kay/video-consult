import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';

@Component({
  selector: 'az-consultant-about',
  templateUrl: './consultant-about.component.html',
  styleUrls: ['./consultant-about.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantAboutComponent {
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
