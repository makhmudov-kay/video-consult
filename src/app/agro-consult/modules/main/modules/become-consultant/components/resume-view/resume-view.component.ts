import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorizedUserModel } from 'ngx-az-core';
import { SelectedValue } from '../../dto/selected-values.interface';

@Component({
  selector: 'az-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeViewComponent {
  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Input()
  user!: AuthorizedUserModel;

  /**
   *
   */
  @Input()
  imageSrc!: NzSafeAny[];

  /**
   *
   */
  @Input()
  docsSrc!: any;

  /**
   *
   */
  @Input()
  selectedValues!: SelectedValue;
}
