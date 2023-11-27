import {
  ProfileInfo,
  Application,
} from './../../../models/application.interface';
import { NavigateToService } from 'projects/agro-pay/src/app/agro-pay/modules/transfers/services/navigate-to.service';
import { P2pService } from 'projects/agro-pay/src/app/agro-pay/modules/transfers/services/p2p.service';
import { PaymentDetails } from 'projects/agro-pay/src/app/container/payment-without-registration/payment-without-registration.component';
import { CancelResponseService } from '../../services/cancel-response.service';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NgDestroy, Project } from 'ngx-az-core';
import { takeUntil } from 'rxjs';
import { Message } from '../../../models/message.interface';
import { Offer } from '../../../models/offer.request';
import { ListenApplicationDataWS } from '../../../models/ws-listen-application-status.interface';
import { ApplicationsService } from '../../../services/application.service';
import { ChatMessageService } from '../../../services/chat-message.service';
import { CancelResponse } from '../../models/cancel-response.request';
import { PaymentService } from '../../../payment/service/payment.service';
import { LastPriceService } from '../../services/last-price.service';

@Component({
  selector: 'az-messages-window',
  templateUrl: './messages-window.component.html',
  styleUrls: ['./messages-window.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesWindowComponent implements OnInit, OnDestroy {
  /**
   *
   */
  @Input()
  id?: string;

  /**
   *
   */
  @Input()
  profileId!: number;
  /**
   *
   */
  @Input()
  duration!: number;

  /**
   *
   */
  @Input()
  isClient!: boolean;

  /**
   *
   */
  @Input()
  toProfileId!: number;

  /**
   *
   */
  @Input()
  applicationId!: number;

  /**
   *
   */
  @Input()
  status!: number;

  /**
   *
   */
  @Input()
  consultantId!: number;

  /**
   *
   */
  @Input()
  applicationInfo!: Application;

  /**
   *
   */
  @Input()
  resumeId!: number;

  /**
   *
   */
  @Input()
  isConnected!: boolean;

  /**
   *
   */
  @Input()
  applicationType!: string;

  /**
   *
   */
  @Input()
  joinedUser!: boolean;

  /**
   *
   */
  @Input()
  isStreaming!: boolean;

  /**
   *
   */
  @Output()
  statusChange = new EventEmitter();

  /**
   *
   */
  @Output()
  handleVideoCall = new EventEmitter();

  /**
   *
   */
  @Output()
  handleInvite = new EventEmitter();

  /**
   *
   */
  @Output()
  listenerStatus = new EventEmitter<number>();

  /**
   *
   */
  @ViewChild('scrollContainer')
  scrollContainer?: ElementRef;

  /**
   *
   */
  form!: FormGroup;

  /**
   *
   */
  isVisibleModal = false;

  /**
   *
   */
  isVisibleAttachModal = false;

  /**
   *
   */
  isVisibleConfirm = false;

  /**
   *
   */
  isVisibleConfirmDrawer = false;

  /**
   *
   */
  isVisibleComplete = false;

  /**
   *
   */
  messagesByDate = new Map();

  /**
   *
   */
  messages!: Message[];

  /**
   *
   */
  listenApplication?: ListenApplicationDataWS;

  /**
   *
   */
  file?: File | null;

  /**
   *
   */
  lastPrice!: number;

  /**
   *
   */
  fileSrc!: string;

  /**
   *
   */
  isModal = true;

  /**
   *
   */
  @ViewChild('input')
  input!: ElementRef;

  /**
   *
   */
  isVisiblePaymentModal = false;

  /**
   *
   * @param cd
   * @param $messages
   * @param datePipe
   * @param fb
   * @param $destroy
   * @param $application
   */
  constructor(
    private cd: ChangeDetectorRef,
    private $messages: ChatMessageService,
    protected datePipe: DatePipe,
    private fb: FormBuilder,
    private $destroy: NgDestroy,
    private $application: ApplicationsService,
    private $cancel: CancelResponseService,
    private $payment: PaymentService,
    private $checkLastPrice: LastPriceService
  ) {}

  /**
   *
   */
  private initForm() {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1000)]],
      text: [null],
      message: [''],
      file: [null],
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    if (window.innerWidth < 576) {
      this.isModal = false;
    }
    this.initForm();
    if (this.id) {
      // if (!this.applicationInfo.application.is_free) {
      this.checkLastPrice(true);
      // }
      this.getMessages(this.id);
      this.listenChatChannel(this.id);
      this.listenStatusApplication(this.id);
      this.getLiveMessage();
      this.getLiveData();
    }
  }

  /**
   *
   * @param message
   */
  private setMessageToMap(message: Message) {
    const key = this.datePipe.transform(message.created_at, 'MM.dd.yyyy');
    let messages = this.messagesByDate.get(key);

    if (!messages) {
      messages = [];
      this.messagesByDate.set(key, messages);
    }
    messages.push(message);
  }

  /**
   *
   * @param id
   */
  private listenChatChannel(id: string) {
    this.$messages.listenChatChannel(id);
  }

  /**
   *
   * @param id
   */
  private listenStatusApplication(id: string) {
    this.$messages.listenStatusApplication(id);
  }

  /**
   * Отрисовка отправленного сообщения на стороне отрпавителя
   */
  private getLiveMessage() {
    this.$messages.getMessage().subscribe((message) => {
      // console.log(message?.chatMessage.chat_id);

      if (message) {
        const liveMessage: Message = {
          chat_id: message.chatMessage.chat_id,
          created_at: message.chatMessage.created_at,
          from_profile_id: message.chatMessage.from_profile_id,
          message: message.chatMessage.message,
          is_showed: message.chatMessage.is_showed,
          showed_at: message.chatMessage.showed_at,
          updated_at: message.chatMessage.updated_at,
          is_price: message.chatMessage.is_price,
          owner: this.toProfileId == message.to_profile_id,
          id: message.chatMessage.id,
          file: message.chatMessage.file,
          file_original_name: message.chatMessage.file_original_name,
          action_status: message.chatMessage.action_status,
          type: message.chatMessage.type,
          call_status: message.chatMessage.call_status,
          call_duration: message.chatMessage.call_duration,
        };

        if (!liveMessage.fileType) {
          this.addFileType(liveMessage);
        }

        if (liveMessage.call_status && liveMessage.owner) {
          liveMessage.call_status = 2;
          this.addMessage(liveMessage);
        }

        if (!liveMessage.owner) {
          this.addMessage(liveMessage);
        }
      }
    });
  }

  /**
   *
   * @param liveMessage
   */
  private addFileType(liveMessage: Message) {
    if (liveMessage.file) {
      const fileExtension = this.getFileExtension(liveMessage.file);
      switch (fileExtension) {
        case 'jpeg':
        case 'jpg':
        case 'png':
          liveMessage.fileType = 'img';
          break;
        case 'xls':
        case 'doc':
        case 'pdf':
          liveMessage.fileType = 'doc';
          break;
        case 'x-m4v':
        case 'mp4':
          liveMessage.fileType = 'video';
          break;

        default:
          break;
      }
    }
  }

  /**
   *
   */
  private getLiveData() {
    this.listenApplication = undefined;
    this.$messages
      .getDataApplcation()
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        if (result) {
          this.listenApplication = result.data;
          console.log(result, result.data.status);

          this.listenerStatus.emit(result.data.status);
          this.scrollToBottom();
          this.cd.markForCheck();
        }
      });
  }

  /**
   *
   * @param liveMessage
   */
  addMessage(liveMessage: Message) {
    this.setMessageToMap(liveMessage);
    this.messagesByDate = new Map(this.messagesByDate);
    this.scrollToBottom();
    this.cd.markForCheck();
  }

  /**
   * Автоматическая прокрутка вниз, при добавлении нового сообщения и при загрузке страницы
   */
  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }
    });
  }

  /**
   * Получение списка сообщений при загрузке страницы
   * @param id
   */
  getMessages(id: string) {
    const param = new HttpParams().append('chat_id', id);
    this.$messages.getMessages(param).subscribe((result) => {
      const messages = result.data;
      for (let index = messages.length - 1; index >= 0; index--) {
        const message = messages[index];
        this.addFileType(message);
        this.setMessageToMap(message);
      }

      this.scrollToBottom();
      this.cd.markForCheck();
    });
  }

  /**
   * Получение расширения файла
   * @param file
   * @returns
   */
  private getFileExtension(file: string) {
    const splitedFile = file.split('.');
    const getFormat = splitedFile[splitedFile.length - 1];
    return getFormat;
  }

  /**
   *
   */
  handleCancel() {
    this.isVisibleModal = false;
    this.cd.markForCheck();
  }

  /**
   *  Открытие модалки для добавления файла
   */
  openAttachModal() {
    this.isVisibleAttachModal = true;
  }

  /**
   * ОТправить предложение
   */
  sendOffer() {
    if (this.id) {
      if (this.form.invalid) {
        Object.values(this.form.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        return;
      }
      this.scrollToBottom();
      const request = this.form.getRawValue();
      const offerRequest: Offer = {
        chat_id: this.id,
        msg: [
          { message: request.text, is_price: false },
          { message: request.amount, is_price: true, action_status: 1 },
        ],
      };

      this.setMessageToMap({
        chat_id: +this.id,
        owner: true,
        message: request.text,
        created_at: new Date(),
        type: 'chat',
      } as Message);
      this.setMessageToMap({
        chat_id: +this.id,
        owner: true,
        message: request.amount,
        created_at: new Date(),
        is_price: true,
        action_status: 1,
        from_profile_id: this.profileId,
        type: 'chat',
      } as Message);

      this.messagesByDate = new Map(this.messagesByDate);
      this.scrollToBottom();
      this.cd.markForCheck();

      this.$messages
        .sendOffer(offerRequest)
        .pipe(takeUntil(this.$destroy))
        .subscribe(() => {
          this.isVisibleModal = false;
          this.form.reset();
          this.cd.markForCheck();
        });
    }
  }

  /**
   *
   * @returns
   */
  sendMessage() {
    if (this.id) {
      if (
        !this.form.controls['message'].value &&
        !this.form.controls['file'].value
      ) {
        return;
      }
      const request = this.form.getRawValue();
      const offerRequest: Offer = {
        chat_id: this.id,
        msg: [
          { message: request.message, is_price: false, file: request.file },
        ],
      };

      this.addMessage({
        chat_id: +this.id,
        owner: true,
        message: request.message,
        created_at: new Date(),
        file: this.fileSrc,
        type: 'chat',
      } as Message);

      this.form.reset();
      this.$messages
        .sendOffer(offerRequest)
        .pipe(takeUntil(this.$destroy))
        .subscribe(() => {
          this.cd.markForCheck();
        });
    }
  }

  /**
   *
   */
  offerPrice() {
    this.isVisibleModal = true;
  }

  /**
   *
   */
  closeAttachFileModal() {
    this.isVisibleAttachModal = false;
  }

  /**
   *
   */
  acceptOffer(isConsultant = false) {
    let request;
    // console.log(this.lastPrice);

    if (isConsultant) {
      request = {
        chat_id: Number(this.id),
        status: this.lastPrice > 0 ? 7 : 2,
        to_profile_id: this.profileId,
      };
      // console.log('isConsultant', request);
    } else {
      request = {
        chat_id: Number(this.id),
        status: this.lastPrice > 0 ? 7 : 2,
        to_profile_id: this.consultantId,
      };
      // console.log(request);
    }

    if (this.applicationId) {
      this.$application
        .updateApplication(this.applicationId, request)
        .subscribe(() => {
          this.statusChange.emit();
        });
    }
  }
  //!TODO
  /**
   *
   */
  handleToPay() {
    // const request = {
    //   chat_id: Number(this.id),
    //   status: 2,
    //   to_profile_id: this.consultantId,
    // };

    // if (this.applicationId) {
    //   this.$application
    //     .updateApplication(this.applicationId, request)
    //     .subscribe(() => {
    //       this.statusChange.emit();
    //     });
    // }
    this.checkLastPrice();
  }

  /**
   *
   */
  checkLastPrice(firstLoad?: boolean) {
    if (this.id) {
      this.$checkLastPrice
        .getLastPrice(Number(this.id))
        .pipe(takeUntil(this.$destroy))
        .subscribe({
          next: (result: any) => {
            if (result.success) {
              if (firstLoad) {
                this.lastPrice = result.data;
                this.cd.markForCheck();
              } else {
                this.isVisiblePaymentModal = true;
                this.lastPrice = result.data;
                this.cd.markForCheck();
              }
            }
          },
          error: (error) => {
            // console.log(error);
            this.lastPrice = 0;
            this.cd.markForCheck();
            // console.log(this.lastPrice);
          },
        });
    }
  }

  /**
   *
   * @param advertisement
   * @returns
   */
  navigateToAgroPay(application: Application) {
    if (this.lastPrice > 0) {
      const paymentDetails: PaymentDetails = {
        amount: this.lastPrice.toString(),
        order: {
          id: application.application.id,
          name: application.application.title,
        },
        projectId: Project.agroConsult,
        receiver: application.profile.fullname,
        receiverId: application.profile.id,
      };
      this.$payment.pay(paymentDetails);
    }
  }

  /**
   *
   */
  closePaymentModal() {
    this.isVisiblePaymentModal = false;
    this.cd.markForCheck();
  }

  /**
   *
   */
  cancelResponse(isPaymentStatus?: boolean) {
    /* Отказ для приватных заявок нужно изменять статус самой заявки напряму */
    if (this.applicationType === 'private') {
      const request = {
        chat_id: Number(this.id),
        status: 6,
      };

      this.$application
        .updateApplication(this.applicationId, request)
        .subscribe(() => {
          this.statusChange.emit();
        });
      return;
    }
    /* Изменяет статус отклика ни как не влияет на статус заявки */

    if (isPaymentStatus) {
      const requestStatus = {
        chat_id: Number(this.id),
        status: 1,
      };

      this.$application
        .updateApplication(this.applicationId, requestStatus)
        .subscribe(() => {
          this.statusChange.emit();
        });

      return;
    }

    const request: CancelResponse = {
      chat_id: Number(this.id),
      application_id: this.applicationId,
      profile_id: this.consultantId,
    };

    this.$cancel.cancelApplication(request).subscribe(() => {
      this.statusChange.emit();
    });
  }

  /**
   *
   */
  completeApplication() {
    const request = {
      chat_id: Number(this.id),
      status: 4,
    };

    if (this.applicationId) {
      this.$application
        .updateApplication(this.applicationId, request)
        .subscribe(() => {
          this.isVisibleComplete = false;
          this.statusChange.emit();
        });
    }
  }

  /**
   *
   * @param isActual
   */
  isActual(isActual = false) {
    // console.log(isActual);
    if (isActual) {
      const request = {
        chat_id: Number(this.id),
        status: 1,
      };

      if (this.applicationId) {
        this.updateApplicationStatus(request);
      }
      return;
    }

    const request = {
      chat_id: Number(this.id),
      status: 6,
    };

    if (this.applicationId) {
      this.updateApplicationStatus(request);
    }
  }

  /**
   *
   * @param request
   */
  private updateApplicationStatus(request: {
    chat_id: number;
    status: number;
  }) {
    this.$application
      .updateApplication(this.applicationId, request)
      .subscribe(() => {
        this.statusChange.emit();
      });
  }

  /**
   *
   */
  openCompleteModal() {
    this.isVisibleComplete = true;
  }

  /**
   *
   */
  openConfirmModal() {
    this.isVisibleConfirm = true;
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
   * @param ea
   */
  sendMessageByEnter(e: any) {
    e.preventDefault();
    this.sendMessage();
  }

  /**
   *
   */
  ngOnDestroy() {
    if (this.id) {
      this.$messages.leaveChatChanel(this.id);
      this.$messages.leaveStatusApplication(this.id);
    }
  }

  /**
   *
   */
  inviteToVideoCall() {
    this.handleInvite.emit();
  }

  /**
   *
   * @param message
   */
  checkOnLink(message: string) {
    return message.includes('https://');
  }
}
