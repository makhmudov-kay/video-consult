import { CheckHasPaymentCard } from './../../../../../../../shared/payment/model/check-has-card.response';
import { PaymentService } from './../../../../../../../shared/payment/service/payment.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Select } from '@ngxs/store';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  AuthorizedUserModel,
  AuthState,
  DataState,
  NgDestroy,
  CheckHasResume,
} from 'ngx-az-core';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { ResumeService } from 'projects/agro-consult/src/app/shared/services/resume.service';
import { Observable, takeUntil, map } from 'rxjs';
import { SelectedValue } from '../../dto/selected-values.interface';
import { UploadFilesDataService } from 'projects/agro-consult/src/app/shared/upload-img/upload-img.service';

@Component({
  selector: 'az-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumePageComponent {
  /**
   *
   */
  isVisible = false;

  /**
   *
   */
  id?: string;

  /**
   *
   */
  @Select(AuthState.authorizedUser)
  authorizedUser$!: Observable<AuthorizedUserModel>;

  /**
   *
   */
  @Select(DataState.checkHasResume)
  checkHasResume$!: Observable<CheckHasResume>;

  /**
   *
   */
  get isUserAuthetificate() {
    return !this.$jwtHelper.isTokenExpired();
  }

  /**
   *
   */
  isLoading = false;

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
  docsSrc: NzSafeAny = [];

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
  resumeCount!: number;

  /**
   *
   */
  resumeTitle = 'becomeConsultant';

  /**
   *
   */
  selectedValues!: SelectedValue;

  /**
   *
   */
  resumeInfo!: ResumeResponse;

  /**
   *
   */
  // hasPaymentCard!: boolean;
  hasPaymentCard$!: Observable<CheckHasPaymentCard>;

  /**
   *
   */
  forDeleteImages: string[] = [];

  /**
   *
   */
  attachedFileDelete: number[] = [];

  /**
   *
   */
  disableBtn = false;

  /**
   *
   */
  isError = false;

  /**
   *
   * @param fb
   * @param $destroy
   * @param $resume
   * @param cd
   * @param route
   * @param $jwtHelper
   */
  constructor(
    private fb: FormBuilder,
    private $destroy: NgDestroy,
    private $resume: ResumeService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private $jwtHelper: JwtHelperService,
    private $payment: PaymentService,
    private $files: UploadFilesDataService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.cd.markForCheck();
  }

  /**
   * пока спрятали skills если понадобится вернем обратно
   */
  private initForm() {
    this.form = this.fb.group({
      category_id: [this.resumeInfo?.category_id, [Validators.required]],
      position: new FormGroup({
        ru: new FormControl(this.resumeInfo?.position, Validators.required),
      }),
      skill_ids: [this.resumeInfo?.skill_ids],
      files: [null], //IMAGES
      attached_files: [null], //DOCUMENT
      language: [this.resumeInfo?.language, [Validators.required]],
      about: new FormGroup({
        ru: new FormControl(this.resumeInfo?.about, Validators.required),
      }),
    });
  }

  /**
   *
   */
  resetFiles() {
    this.$files.docs = [];
    this.$files.files = [];
  }

  /**
   *
   */
  private markFormControlsValidations(control: string) {
    this.form.controls[control].markAsDirty();
    this.form.controls[control].updateValueAndValidity({
      onlySelf: true,
    });
  }

  /**
   *
   */
  private getResumeCount() {
    this.checkHasResume$.pipe(takeUntil(this.$destroy)).subscribe((result) => {
      if (result) {
        this.resumeCount = result.count;
        this.cd.markForCheck();
      }
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.resetFiles();
    this.checkHasPaymentCard();
    if (this.id) {
      this.loadResume(this.id)
        .pipe(takeUntil(this.$destroy))
        .subscribe((result) => {
          this.imageSrc = result.data.files ?? [];
          this.docsSrc = result.data.attached_files ?? [];
          this.resumeInfo = result.data;
          this.resumeTitle = 'changeResume';
          this.initForm();
          this.cd.markForCheck();
        });
      return;
    }
    this.getResumeCount();
    this.initForm();
  }

  /**
   *
   * @param id
   * @returns
   */
  private loadResume(id: string) {
    return this.$resume.getResumeById(id);
  }

  /**
   *
   */
  checkHasPaymentCard() {
    this.hasPaymentCard$ = this.$payment
      .checkHasPaymentCard()
      .pipe(map((result) => result.data));
  }

  /**
   *
   * @param image
   */
  imageForDelete(image: string) {
    this.forDeleteImages.push(image);
  }

  /**
   *
   * @param image
   */
  fileForDelete(fileId: number) {
    this.attachedFileDelete.push(fileId);
  }

  /**
   *
   * @param selectedValues
   */
  handleSelectedValues(selectedValues: SelectedValue) {
    this.selectedValues = selectedValues;
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
    if (this.current === 0) {
      if (this.form.invalid) {
        if (this.form.controls['category_id'].invalid) {
          this.markFormControlsValidations('category_id');
        }
        if (this.form.controls['position'].invalid) {
          this.markFormControlsValidations('position');
        }
        // if (this.form.controls['skill_ids'].invalid) {
        //   this.markFormControlsValidations('skill_ids');
        // }
        if (this.form.controls['language'].invalid) {
          this.markFormControlsValidations('language');
        }
        if (this.form.controls['about'].invalid) {
          this.markFormControlsValidations('about');
        }
        return;
      }
    }
    this.current += 1;
    this.changeContent();
  }

  /**
   *
   */
  createResume(): void {
    this.submit();
  }

  /**
   *
   */
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 1;
        this.resumeTitle = 'becomeConsultant';
        break;
      }
      case 1: {
        this.index = 2;
        this.resumeTitle = 'creatingResume';
        break;
      }
      default: {
        this.index = 0;
      }
    }
  }

  /**
   *
   */
  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const request = this.form.getRawValue();
    request.file_delete = this.forDeleteImages;
    request.attached_file_delete = this.attachedFileDelete;
    request.position.uz_cyrl = request.position.ru;
    request.position.uz_latn = request.position.ru;
    request.about.uz_cyrl = request.about.ru;
    request.about.uz_latn = request.about.ru;

    if (this.id) {
      this.$resume
        .edit(this.id, request)
        .pipe(takeUntil(this.$destroy))
        .subscribe((result) => {
          if (result.success) {
            this.isLoading = false;
            this.isVisible = true;
            this.cd.markForCheck();
            return;
          } else {
            this.isLoading = false;
            this.isError = true;
            this.cd.markForCheck();
          }
        });
      return;
    }
    this.$resume
      .add(request)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        if (result.success) {
          this.isLoading = false;
          this.isVisible = true;
          this.cd.markForCheck();
          return;
        } else {
          this.isLoading = false;
          this.isError = true;
          this.cd.markForCheck();
        }
      });
  }

  /**
   *
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   *
   */
  addPaymentCard() {
    this.$payment.navigateToAgroPay('cards');
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
