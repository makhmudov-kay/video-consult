import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'az-step-fourth',
  templateUrl: './step-fourth.component.html',
  styleUrls: ['./step-fourth.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFourthComponent implements OnInit {
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
  @Output()
  disableNextBtn = new EventEmitter<boolean>();

  /**
   *
   */
  date = false;

  /**
   *
   */
  consultantTime = 'flexible';

  /**
   *
   */
  ngOnInit(): void {
    if (this.form.controls['when_date'].value) {
      this.consultantTime = 'today';
      this.date = true;
    }
  }

  /**
   *
   * @param value
   */
  changePickerValue(value: string) {
    if (value === 'today') {
      this.date = true;
      if (!this.form.controls['when_date'].value) {
        this.disableNextBtn.emit(true);
      }
    } else {
      this.form.controls['when_date'].reset();
      this.date = false;
      this.disableNextBtn.emit(false);
    }
  }

  /**
   *
   * @param e
   */
  disableHandler(e: any) {
    if (e && e !== null) {
      this.disableNextBtn.emit(false);
      return;
    }
    this.disableNextBtn.emit(true);
  }

  /**
   *
   * @param date
   * @returns
   */
  disablePreviousDate = (date: Date) => {
    const dayMilliseconds = 24 * 60 * 60 * 1000;
    const nowDate = new Date();
    nowDate.setTime(nowDate.getTime() - dayMilliseconds);
    return date < nowDate;
  };
}
