import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'az-step-fifth',
  templateUrl: './step-fifth.component.html',
  styleUrls: ['./step-fifth.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFifthComponent implements OnInit {
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
  @Input()
  id?: string;

  /**
   *
   */
  priceType = 'free';

  /**
   *
   */
  rangeError = false;

  /**
   *
   */
  maxPriceValidation = false;

  /**
   *
   */
  @Output()
  disableNextBtn = new EventEmitter<boolean>();

  /**
   *
   * @param cd
   */
  constructor(private cd: ChangeDetectorRef) {}

  /**
   *
   * @param state
   */
  private handleRangeError(state: boolean, maxPrice?: boolean) {
    if (maxPrice) {
      this.maxPriceValidation = true;
    } else {
      this.maxPriceValidation = false;
    }
    this.rangeError = maxPrice ? false : state;
    this.disableNextBtn.emit(state);
    this.cd.markForCheck();
  }

  /**
   *
   */
  ngOnInit(): void {
    if (this.form.controls['price_to'].value) {
      this.priceType = 'paid';
    }
  }

  /**
   *
   * @param event
   */
  changeValidationStatus() {
    this.validationChange.emit(false);
    const priceFrom = +this.form.controls['price_from'].value;
    const priceTo = +this.form.controls['price_to'].value;

    if (
      isFinite(priceFrom) &&
      isFinite(priceTo) &&
      priceTo >= priceFrom &&
      priceFrom > 999 &&
      priceTo < 9999999
    ) {
      this.handleRangeError(false);
      return;
    }

    if (priceTo > 9999999) {
      this.handleRangeError(true, true);
      return;
    }
    this.handleRangeError(true);
  }

  /**
   *
   */
  handlePriceFrom() {
    const priceFrom = this.form.controls['price_from'].value;
    this.form.controls['price_to'].setValue(priceFrom);
    this.changeValidationStatus();
  }

  /**
   *
   * @returns
   */
  handlePersonalPrice() {
    const priceTo = +this.form.controls['price_to'].value;
    if (isFinite(priceTo) && priceTo < 9999999 && priceTo > 999) {
      this.handleRangeError(false);
      return;
    }
    if (priceTo > 9999999) {
      this.handleRangeError(true, true);
      return;
    }
    this.handleRangeError(true);
  }

  /**
   *
   * @param e
   */
  changePickerValue(e: string) {
    this.priceType = e;
    if (e === 'free') {
      this.form.controls['is_free'].setValue(true);
      this.form.controls['price_to'].setValue(null);
      this.form.controls['price_from'].setValue(null);
      this.disableNextBtn.emit(false);
    } else {
      this.form.controls['is_free'].setValue(false);
    }
    this.cd.markForCheck();
  }
}
