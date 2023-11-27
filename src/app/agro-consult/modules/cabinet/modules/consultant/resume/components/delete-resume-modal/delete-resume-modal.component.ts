import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgDestroy } from 'ngx-az-core';
import { ResumeService } from 'projects/agro-consult/src/app/shared/services/resume.service';
import { takeUntil, tap } from 'rxjs';

@Component({
  selector: 'az-delete-resume-modal',
  templateUrl: './delete-resume-modal.component.html',
  styleUrls: ['./delete-resume-modal.component.less'],
  providers: [NgDestroy],
})
export class DeleteResumeModalComponent {
  /**
   *
   */
  @Input()
  id!: number;

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
  @Output()
  refreshResumeList = new EventEmitter();

  constructor(
    private $resume: ResumeService,
    private $destroy: NgDestroy,
    private cd: ChangeDetectorRef
  ) {}

  /**
   *
   */
  showModal(): void {
    this.isVisible = true;
  }

  /**
   *
   */
  handleOk() {
    return this.$resume.removeResume(this.id).pipe(
      tap(() => {
        this.refreshResumeList.emit();
        this.isVisibleChange.emit(false);
      })
    );
  }

  /**
   *
   */
  handleCancel(): void {
    this.isVisibleChange.emit(false);
  }

  /**
   *
   * @param id
   */
  // deleteResume() {
  //   this.$resume
  //     .removeResume(this.id)
  //     .pipe(takeUntil(this.$destroy))
  //     .subscribe(() => {
  //       this.getMyResume();
  //       this.cd.markForCheck();
  //     });
  // }
}
