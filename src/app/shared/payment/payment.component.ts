import { takeUntil, Observable, map } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { PaymentService } from './service/payment.service';
import { GridLogic, NgDestroy, UserInfo, DataState } from 'ngx-az-core';
import { PaymentHistoryService } from './service/payment-history.service';
import { CheckHasPaymentCard } from './model/check-has-card.response';
import { Select } from '@ngxs/store';
import { HistoryTransaction } from './model/history.response';
import { TransactionService } from 'projects/agro-pay/src/app/agro-pay/modules/history/services/transaction.service';
import { environment } from 'projects/agro-pay/src/environments/environment.prod';

@Component({
  selector: 'az-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent
  extends GridLogic<HistoryTransaction>
  implements OnInit
{
  /**
   *
   */
  profileId!: number;

  /**
   *
   */
  checkPaymentCard$!: Observable<CheckHasPaymentCard>;

  /**
   *
   */
  isDisableChequeBtn = false;

  /**
   *
   */
  @Select(DataState.getUserInfo)
  userInfo$!: Observable<UserInfo | null>;

  /**
   *
   * @param $payment
   * @param $destroy
   * @param cd
   */
  constructor(
    protected override $data: PaymentHistoryService,
    protected override cd: ChangeDetectorRef,
    private $payment: PaymentService,
    private $destroy: NgDestroy,
    private $transaction: TransactionService
  ) {
    super($data, cd);
  }

  /**
   *
   */
  private checkHasPaymentCard() {
    this.checkPaymentCard$ = this.$payment
      .checkHasPaymentCard()
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  private getUserInfo() {
    this.userInfo$.pipe(takeUntil(this.$destroy)).subscribe((user) => {
      if (user) {
        this.profileId = user.profile.id;
        this.cd.markForCheck();
      }
    });
  }

  /**
   *
   */
  ngOnInit() {
    this.checkHasPaymentCard();
    this.getUserInfo();
    this.loadData();
  }

  /**
   *
   */
  addPaymentCard() {
    this.$payment.navigateToAgroPay('cards');
  }

  /**
   *
   */
  viewPaymentsHistory() {
    this.$payment.navigateToAgroPay('history');
  }

  /**
   *
   * @param data
   */
  handleDownloadBtn(data: HistoryTransaction) {
    this.downloadCheque(data.transaction_id);
  }

  /**
   *
   */
  downloadCheque(transactionId: number) {
    this.isDisableChequeBtn = true;
    this.$transaction
      .getCheque(transactionId, environment.endpoint)
      .subscribe((data: Blob) => {
        this.isDisableChequeBtn = false;
        this.$transaction.downloadFile(data, transactionId);
        this.cd.markForCheck();
      });
    this.cd.markForCheck();
  }
}
