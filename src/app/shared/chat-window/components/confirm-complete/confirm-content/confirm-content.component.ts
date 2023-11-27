import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'az-confirm-content',
  templateUrl: './confirm-content.component.html',
  styleUrls: ['./confirm-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmContentComponent {
  /**
   *
   */
  @Output()
  handleOkEmitter = new EventEmitter();

  /**
   *
   */
  @Output()
  handleCloseEmitter = new EventEmitter();

  /**
   *
   */
  closeModal() {
    this.handleCloseEmitter.emit();
  }

  /**
   *
   */
  handleOk() {
    this.handleOkEmitter.emit();
  }
}
