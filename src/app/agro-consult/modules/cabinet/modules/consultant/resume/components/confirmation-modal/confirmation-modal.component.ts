import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'az-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.less'],
})
export class ConfirmationModalComponent {
  /**
   *
   */
  @Input()
  isVisible!: boolean;

  /**
   *
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  /**
   * 
   */
  showModal(): void {
    this.isVisible = true;
  }

  /**
   * 
   */
  handleOk(): void {
    this.isVisibleChange.emit(false);
  }

  /**
   * 
   */
  handleCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
