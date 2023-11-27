import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'az-confirm-complete',
  templateUrl: './confirm-complete.component.html',
  styleUrls: ['./confirm-complete.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmCompleteComponent {
  /**
   *
   */
  @Input()
  isVisibleConfirm!: boolean;

  /**
   *
   */
  @Input()
  isModal!: boolean;

  /**
   *
   */
  @Output()
  isVisibleConfirmChange = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  confirmComplete = new EventEmitter();

  /**
   *
   */
  handleOk() {
    this.confirmComplete.emit();
    this.closeModal();
  }

  /**
   *
   */
  closeModal() {
    this.isVisibleConfirmChange.emit(false);
  }
}
