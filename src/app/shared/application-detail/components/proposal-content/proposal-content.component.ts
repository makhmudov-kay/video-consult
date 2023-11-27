import {
  Component,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ResumeResponse } from '../../../models/resume.response';
import { UserInfo } from '../../../models/search-application.interface';

@Component({
  selector: 'az-proposal-content',
  templateUrl: './proposal-content.component.html',
  styleUrls: ['./proposal-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalContentComponent implements OnInit {
  /**
   *
   */
  @Input()
  private!: boolean;

  /**
   *
   */
  @Input()
  isLoading!: boolean;

  /**
   *
   */
  @Input()
  isFree!: boolean;

  /**
   *
   */
  @Input()
  form!: UntypedFormGroup;

  /**
   *
   */
  @Input()
  userInfo!: UserInfo;

  /**
   *
   */
  @Output()
  cancelHandler = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  okHandler = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  setFreeConsult = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  submitResponse = new EventEmitter();

  /**
   *
   */
  @Input()
  myResumeList!: ResumeResponse[] | null;

  /**
   *
   */
  activeResumeList!: ResumeResponse[];

  /**
   *
   */
  freeConsultation = false;

  /**
   *
   */
  constructor(private cd: ChangeDetectorRef) {}

  /**
   *
   */
  ngOnInit() {
    if (this.myResumeList) {      
      this.activeResumeList = this.myResumeList
        .filter((r) => r.status === 2)
        .filter((r) => r.visible === true);
    }

    if (this.isFree) {
      this.setFree(this.isFree);
      this.freeConsultation = this.isFree
    }
  }
  /**
   *
   */
  handleCancel() {
    this.cancelHandler.emit(false);
  }

  /**
   *
   */
  handleOk() {
    this.okHandler.emit(true);
    this.submitResponse.emit();
  }

  /**
   *
   * @param isFree
   */
  setFree(isFree: boolean) {
    this.setFreeConsult.emit(isFree);
    this.freeConsultation = isFree;
    this.cd.markForCheck();
  }
}
