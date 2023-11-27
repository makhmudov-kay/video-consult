import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';

@Component({
  selector: 'az-attached-files',
  templateUrl: './attached-files.component.html',
  styleUrls: ['./attached-files.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachedFilesComponent {
  /**
   *
   */
  @Input()
  consultantInfo!: ResumeResponse;
}
