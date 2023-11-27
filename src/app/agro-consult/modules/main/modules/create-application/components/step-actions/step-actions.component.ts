import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'az-step-actions',
  templateUrl: './step-actions.component.html',
  styleUrls: ['./step-actions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepActionsComponent {
  /**
   *
   */
  @Input()
  currentStep!: number;

  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Input()
  validation!: boolean;

  /**
   *
   */
  @Input()
  disableBtn!: boolean;

  /**
   *
   */
  @Input()
  isLoading!: boolean;

  /**
   *
   */
  @Output()
  validationChange = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  previous = new EventEmitter();

  /**
   *
   */
  @Output()
  nextStep = new EventEmitter();

  /**
   *
   */
  @Output()
  submitForm = new EventEmitter();

  /**
   *
   * @param cd
   */
  constructor(private cd: ChangeDetectorRef) {}

  /**
   *
   */
  pre() {
    this.emitingValidate(false);
    this.previous.emit();
    this.cd.markForCheck();
  }

  /**
   *
   * @param value
   */
  emitingValidate(value: boolean) {
    this.validationChange.emit(value);
  }

  /**
   *
   */
  next() {
    switch (this.currentStep) {
      case 0:
        if (!this.form.controls['title'].value) {
          this.emitingValidate(true);
          return;
        }
        break;
      case 1:
        if (!this.form.controls['category_id'].value) {
          this.emitingValidate(true);
          return;
        }
        break;
      case 2:
        if (!this.form.controls['description'].value) {
          this.emitingValidate(true);
          return;
        }
        break;
      case 4:
        if (
          !this.form.controls['is_free'].value &&
          !this.form.controls['price_to'].value
        ) {
          this.emitingValidate(true);

          return;
        }
        break;
    }
    this.emitingValidate(false);
    this.nextStep.emit();
    this.cd.markForCheck();
  }

  /**
   *
   */
  submit() {
    this.submitForm.emit();
  }
}
