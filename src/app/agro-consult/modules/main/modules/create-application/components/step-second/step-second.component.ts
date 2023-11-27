import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';

@Component({
  selector: 'az-step-second',
  templateUrl: './step-second.component.html',
  styleUrls: ['./step-second.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepSecondComponent {
  /**
   *
   */
  @Output()
  categoryId = new EventEmitter<number>();

  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Input()
  consultantResume!: ResumeResponse;

  /**
   *
   */
  @Input()
  step!: number;

  /**
   *
   */
  @Input()
  validation!: boolean;

  /**
   *
   */
  @Output()
  validationChange = new EventEmitter<boolean>();

  /**
   *
   * @param id
   */
  setCategory(id: number) {
    this.validationChange.emit(false);
    this.categoryId.emit(id);
  }
}
