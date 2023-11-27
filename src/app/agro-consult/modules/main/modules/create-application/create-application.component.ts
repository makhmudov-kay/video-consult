import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NgDestroy, StoreService } from 'ngx-az-core';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { ApplicationsService } from 'projects/agro-consult/src/app/shared/services/application.service';
import { ResumeService } from 'projects/agro-consult/src/app/shared/services/resume.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'az-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateApplicationComponent implements OnInit {
  /**
   *
   */
  radioValue = 'today';

  /**
   *
   */
  current = 0;

  /**
   *
   */
  index = 1;

  /**
   *
   */
  form!: FormGroup;

  /**
   *
   */
  imageSrc: NzSafeAny = [];

  /**
   *
   */
  validation = false;

  /**
   *
   */
  isLoadingBtn = false;

  /**
   *
   */
  id?: string;

  /**
   *
   */
  consultantResume!: ResumeResponse;

  /**
   *
   */
  successModal = false;

  /**
   *
   */
  disableBtn = false;

  /**
   *
   * @param fb
   * @param $applicationsService
   * @param route
   * @param router
   * @param $destroy
   * @param $resume
   */
  constructor(
    private fb: FormBuilder,
    private $applicationsService: ApplicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private $destroy: NgDestroy,
    private $resume: ResumeService,
    private $storeService: StoreService,
    private cd: ChangeDetectorRef
  ) {
    this.id = this.route.snapshot.params['consultantId'];
  }

  /**
   *
   */
  private initForm() {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      when_date: [null],
      price_from: [null, [Validators.min(1000)]],
      price_to: [null, [Validators.min(1000)]],
      // =====
      is_free: [true],
      // =====
      files: [null],
      category_id: [null, [Validators.required]],
      resume_id: [null],
    });
  }

  /**
   *
   */
  private clearInputsAndNavigateToList() {
    this.form.reset();
    this.successModal = true;
    this.isLoadingBtn = false;
    this.cd.markForCheck();
  }

  /**
   *
   * @param id
   */
  private getConsultantResume(id: string) {
    this.$resume
      .getResumeById(id)
      .pipe(takeUntil(this.$destroy))
      .subscribe((resume) => {
        this.consultantResume = resume.data;
      });
  }

  /**
   *
   */
  ngOnInit() {
    this.initForm();
    if (this.id) {
      this.form.controls['resume_id'].setValue(this.id);
      this.getConsultantResume(this.id);
    }
  }

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
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 1;
        break;
      }
      case 1: {
        this.index = 2;
        break;
      }
      case 2: {
        this.index = 3;
        break;
      }
      case 3: {
        this.index = 4;
        break;
      }
      case 4: {
        this.index = 5;
        break;
      }
      case 5: {
        this.index = 6;
        break;
      }
    }
  }

  /**
   *
   */
  submit() {
    this.isLoadingBtn = true;
    const request = this.form.getRawValue();
    this.$applicationsService
      .add(request)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        if (result.success) {
          this.clearInputsAndNavigateToList();
        }
      });
  }

  /**
   *
   */
  handleOk() {
    // console.log('ok');
  }

  /**
   *
   */
  handleCancel() {
    // console.log('ok');
  }

  /**
   *
   * @param category
   */
  setCategory(category: number) {
    this.form.controls['category_id'].setValue(category);
  }

  /**
   *
   */
  navigateToMyApplications() {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'client',
      'applications',
    ]);
  }

  /**
   *
   * @param disable
   */
  disableNextBtn(disable: boolean) {
    this.disableBtn = disable;
    this.cd.markForCheck();
  }
}
