import { ApplicationsService } from './../services/application.service';
import { filter, takeUntil } from 'rxjs';
import { ApplicationResponseService } from './../services/response.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationDetailResponse } from '../models/application-detail.response';
import { ResumeResponse } from '../models/resume.response';
import { MyResumeService } from '../services/my-resume.service';
import { NgDestroy, StoreService } from 'ngx-az-core';
import { CheckResponseService } from '../services/response-check.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RespondChecker } from '../models/respond-checker.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { TranslateService } from '@ngx-translate/core';
import { IsActualService } from './services/is-actual.service';
import { PaymentService } from '../payment/service/payment.service';

@Component({
  selector: 'az-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetailComponent {
  /**
   *
   */
  @Input()
  applicationStatus!: string;

  /**
   *
   */
  @Input()
  application!: ApplicationDetailResponse;

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
  responsed = false;

  /**
   *
   */
  privateForm!: FormGroup;

  /**
   *
   */
  isVisibleModal = false;

  /**
   *
   */
  isVisiblePrivateModal = false;

  /**
   *
   */
  isVisibleDrawer = false;

  /**
   *
   */
  isVisiblePrivateDrawer = false;

  /**
   *
   */
  isModal = true;

  /**
   *
   */
  chatId!: number;

  /**
   *
   */
  // myResumeList$!: Observable<ResumeResponse[]>;

  myResumeList!: ResumeResponse[];

  /**
   *
   */
  checkResponse!: RespondChecker;

  /**
   *
   */
  canceledApplication = true;

  /**
   *
   */
  isActivePaymnetCard!: boolean;

  /**
   *
   */
  freeConsultation!: boolean;

  /**
   *
   */
  isMobileDevice = false;

  /**
   *
   * @param fb
   * @param $myResume
   * @param $applicationResponse
   * @param $destroy
   * @param $checkResponse
   * @param router
   * @param route
   * @param message
   * @param cd
   * @param translate
   */
  constructor(
    private fb: FormBuilder,
    private $myResume: MyResumeService,
    private $applicationResponse: ApplicationResponseService,
    private $destroy: NgDestroy,
    private $checkResponse: CheckResponseService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private $application: ApplicationsService,
    private $isActual: IsActualService,
    private $storeService: StoreService,
    private $payment: PaymentService
  ) {
    if (this.route.snapshot.fragment) {
      this.isMobileDevice = true;
      cd.markForCheck();
    }

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          console.log(11);

          this.checkHasPaymentCard();
        }
      });
  }

  /**
   *
   */
  private initForm() {
    this.form = this.fb.group({
      resume_id: [null, [Validators.required]],
      amount: [
        this.application.price_to,
        [Validators.required, Validators.min(1000)],
      ],
      text: [null, [Validators.required]],
    });
  }

  /**
   *
   */
  private initPrivateForm() {
    this.privateForm = this.fb.group({
      application_id: [null, [Validators.required]],
      resume_id: [null],
      amount: [this.application.price_to, [Validators.required]],
      text: [null, [Validators.required]],
    });
  }

  /**
   *
   */
  checkResumeCounts() {
    if (
      (this.form || this.privateForm) &&
      this.myResumeList.length === 1 &&
      this.myResumeList[0].status === 2
    ) {
      this.form.controls['resume_id'].setValue(this.myResumeList[0].id);
    }
  }

  /**
   *
   */
  private getResumeList() {
    this.$myResume
      .getMyResumeList()
      .pipe(takeUntil(this.$destroy))
      .subscribe((v) => {
        this.myResumeList = v.data;
        this.checkResumeCounts();
        this.cd.markForCheck();
      });
  }

  /**
   *
   * @param id
   */
  private getResponseChecker(id: number) {
    this.$checkResponse
      .get(id)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.checkResponse = result.data;
        this.chatId = result.data.chat_id;
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  ngOnInit(): void {
    if (window.innerWidth < 576) {
      this.isModal = false;
    }
    this.checkHasPaymentCard();
    this.getResumeList();
    this.initForm();
    this.initPrivateForm();
    this.getResponseChecker(this.application.id);
  }

  /**
   *
   */
  checkHasPaymentCard() {
    this.$payment
      .checkHasPaymentCard()
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.isActivePaymnetCard = result.data.active;
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  showModalOrDrawer(): void {
    if (this.isModal) {
      this.isVisibleModal = true;
    } else {
      this.isVisibleDrawer = true;
    }
  }

  /**
   *
   */
  close(): void {
    this.isVisibleDrawer = false;
    this.isVisiblePrivateDrawer = false;
  }

  /**
   *
   */
  navigateTo() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   *
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: NzSafeAny) {
    if (event.target.innerWidth < 576) {
      this.isModal = false;
    } else if (event.target.innerWidth > 575) {
      this.isModal = true;
    }
  }

  /**
   *
   * @param value
   */
  sendRespond() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.cd.markForCheck();
        }
      });
      return;
    }
    if (this.isVisibleModal) {
      this.isVisibleModal = false;
    }

    this.isLoading = true;
    const request = this.form.getRawValue();
    request.application_id = this.application?.id;
    request.amount = this.freeConsultation ? 0 : request.amount;

    this.$applicationResponse
      .respond(request)
      .pipe(takeUntil(this.$destroy))
      .subscribe((data: any) => {
        this.message.success(this.translate.instant('succesResponse'));
        this.responsed = true;
        this.chatId = data.data.chat_id;
        this.isLoading = false;
        this.close();
        this.cd.markForCheck();
      });
  }

  /**
   *
   * @param e
   */
  freeConsult(e: boolean) {
    if (e) {
      this.form.controls['amount']?.disable();
      this.privateForm.controls['amount']?.disable();
    } else {
      this.form.controls['amount']?.enable();
      this.privateForm.controls['amount']?.enable();
    }
    this.freeConsultation = e;
  }

  /**
   *
   * @param value
   */
  sendPrivateRespond() {
    this.isLoading = true;
    const request = this.privateForm.getRawValue();
    request.application_id = this.application?.id;
    request.amount = this.freeConsultation ? null : request.amount;

    const requestBody = {
      application_id: request.application_id,
      msg: [
        {
          message: request.text,
          is_price: false,
        },
        {
          message: request.amount,
          is_price: true,
        },
      ],
    };

    this.$applicationResponse
      .respondPrivate(requestBody)
      .pipe(takeUntil(this.$destroy))
      .subscribe((data: any) => {
        this.isVisiblePrivateModal = false;
        this.message.success(this.translate.instant('succesResponse'));
        this.responsed = true;
        this.chatId = data.data.id;
        // console.log(data);
        this.isLoading = false;
        this.close();
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  deniedApplication() {
    this.$application
      .updateApplication(this.application.id, {
        status: 6,
      })
      .subscribe(() => {
        this.canceledApplication = false;
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  showModalForPrivateApplication() {
    if (this.isModal) {
      this.isVisiblePrivateModal = true;
    } else {
      this.isVisiblePrivateDrawer = true;
    }
  }

  /**
   *
   * @param applicationId
   */
  checkIsActual(applicationId: number) {
    this.$isActual.checkIsActual(applicationId).subscribe((data: any) => {
      this.message.success(this.translate.instant('succesResponse'));
      this.responsed = true;
      this.chatId = data.data.id;
      this.cd.markForCheck();
    });
  }

  /**
   *
   */
  createResume() {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'main',
      'become-consultant',
    ]);
  }

  /**
   *
   */
  navigateToAgroPay() {
    this.$payment.navigateToAgroPay('cards');
  }
}
