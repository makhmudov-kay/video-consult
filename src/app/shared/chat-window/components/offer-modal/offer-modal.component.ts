import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'az-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferModalComponent {
  /**
   *
   */
  @Input()
  isModal!: boolean;

  /**
   *
   */
  @Input()
  isVisibleModal!: boolean;

  /**
   * 
   */
  @Output()
  isVisibleModalChange = new EventEmitter();

  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Output()
  handleCancelModal = new EventEmitter();

  /**
   *
   */
  @Output()
  handleSendOffer = new EventEmitter();

  /**
   *
   */
  handleCancel() {
    this.handleCancelModal.emit();
  }

  /**
   *
   */
  sendOffer() {
    this.handleSendOffer.emit();
  }
}
