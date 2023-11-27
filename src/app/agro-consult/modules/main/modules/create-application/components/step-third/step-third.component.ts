import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'az-step-third',
  templateUrl: './step-third.component.html',
  styleUrls: ['./step-third.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThirdComponent {
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
  imageSrc!: NzSafeAny;

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
  disableNextBtn = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  deletedImg = new EventEmitter<string>();

  /**
   *
   */
  readonly limitImgSize = 10;

  /**
   *
   */
  blockedAddImg = false;

  /**
   *
   * @param cd
   */
  constructor(private cd: ChangeDetectorRef) {}

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
   * @param size
   * @returns
   */
  checkFileSize(size: number) {
    // console.log(size);
    if (size > this.limitImgSize) {
      this.blockedAddImg = true;
      this.disableNextBtn.emit(this.blockedAddImg);
      this.cd.markForCheck();
      return;
    }
    this.blockedAddImg = false;
    this.cd.markForCheck();
  }

  /**
   *
   * @param size
   */
  deletedFileSize(size: number) {
    if (size > this.limitImgSize) {
      this.blockedAddImg = false;
      this.disableNextBtn.emit(this.blockedAddImg);
      this.cd.markForCheck();
    }
  }
}
