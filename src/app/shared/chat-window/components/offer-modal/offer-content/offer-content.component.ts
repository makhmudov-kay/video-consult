import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'az-offer-content',
  templateUrl: './offer-content.component.html',
  styleUrls: ['./offer-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferContentComponent {
  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Output()
  handleCancel = new EventEmitter();

  /**
   *
   */
  @Output()
  sendOffer = new EventEmitter();
}
