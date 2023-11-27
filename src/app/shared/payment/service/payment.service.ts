import { Observable } from 'rxjs';
import { Inject, Injectable, isDevMode } from '@angular/core';
import { BaseResponse, BaseService, LanguageState } from 'ngx-az-core';
import { NavigateToService } from 'projects/agro-pay/src/app/agro-pay/modules/transfers/services/navigate-to.service';
import { CheckHasPaymentCard } from '../model/check-has-card.response';
import { Store } from '@ngxs/store';
import { DOCUMENT } from '@angular/common';
import { Urls } from 'ngx-az-core';
import { DITokens } from 'ngx-az-core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  /**
   *
   */
  checkHasCardUrs = 'check-has-card';

  /**
   *
   * @param $baseService
   */
  constructor(
    private $baseService: BaseService,
    private $navigateTo: NavigateToService,
    private $store: Store,
    @Inject(DOCUMENT) private document: Document,
    @Inject(DITokens.URLS) private urls: Urls
  ) {}

  /**
   *
   * @param paymentDetails
   * @returns
   */
  pay(paymentDetails: any) {
    this.$navigateTo.navigateToAgroPay(paymentDetails);
    return 'code';
  }

  /**
   *
   * @returns
   */
  navigateToAgroPay(route: string) {
    const suffix = `${this.$store.selectSnapshot(
      LanguageState.currentLanguage
    )}/cabinet/${route}?isGoBack=true`;

    if (isDevMode()) {
      this.document.location.href = `http://localhost:4206/${suffix}`;
      return;
    }

    this.document.location.href = `${this.urls.agroPay}/${suffix}`;
  }

  /**
   *
   * @returns
   */
  checkHasPaymentCard(): Observable<BaseResponse<CheckHasPaymentCard>> {
    return this.$baseService.post<CheckHasPaymentCard>(
      `${this.checkHasCardUrs}`
    );
  }
}
