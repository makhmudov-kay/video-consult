import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'az-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentModalComponent {
  /**
   *
   */
  @Input()
  isVisiblePayment = false;

  /**
   *
   */
  selectedCard = 1;

  /**
   *
   */
  current = 0;

  /**
   *
   */
  index = 0;

  /**
   *
   */
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  /**
   *
   */
  next(): void {
    this.current += 1;
    this.changeContent();
  }

  /**
   *
   */
  done(): void {
    // console.log('done');
  }

  /**
   *
   */
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 0;
        break;
      }
      case 1: {
        this.index = 1;
        break;
      }
      case 2: {
        this.index = 2;
        break;
      }
      default: {
        this.index = 0;
      }
    }
  }
}
