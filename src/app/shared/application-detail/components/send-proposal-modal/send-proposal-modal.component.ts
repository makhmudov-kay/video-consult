import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ResumeResponse } from '../../../models/resume.response';
import { UserInfo } from '../../../models/search-application.interface';

@Component({
  selector: 'az-send-proposal-modal',
  templateUrl: './send-proposal-modal.component.html',
  styleUrls: ['./send-proposal-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendProposalModalComponent {
  /**
   *
   */
  @Input()
  isVisible!: boolean;

  /**
   *
   */
  @Input()
  private!: boolean;

  /**
   *
   */
  @Input()
  isFree!: boolean;
  
  /**
   *
   */
  @Input()
  isLoading!: boolean;

  /**
   *
   */
  @Input()
  form!: UntypedFormGroup;

  /**
   *
   */
  @Input()
  myResumeList!: ResumeResponse[] | null;

  /**
   *
   */
  @Input()
  userInfo!: UserInfo;

  /**
   *
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  setFreeConsult = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  handleSubmit = new EventEmitter();

  /**
   *
   */
  handleOk(value?: boolean): void {
    this.isVisibleChange.emit(value);
    this.handleSubmit.emit();
  }

  /**
   *
   */
  handleCancel(value?: boolean): void {
    this.isVisibleChange.emit(value);
  }

  /**
   * 
   * @param e 
   */
  freeConsult(e: boolean) {
    this.setFreeConsult.emit(e)
  }
}
