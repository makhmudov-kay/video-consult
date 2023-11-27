import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'az-step-first',
  templateUrl: './step-first.component.html',
  styleUrls: ['./step-first.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFirstComponent {
  /**
   *
   */
  @Input()
  form!: FormGroup;

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
   */
  @Output()
  nextStepAction = new EventEmitter();

  /**
   *
   * @param event
   */
  changeValidationStatus(event: string) {
    if (event.trim()) {
      this.validationChange.emit(false);
    }
  }

  /**
   *
   */
  nextStep(e: Event) {
    e.preventDefault();
    this.nextStepAction.emit();
  }
}
