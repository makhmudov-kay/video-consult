import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Urls } from 'ngx-az-core';
import { DITokens } from 'ngx-az-core';
import { AuthorizedUserModel, LanguageState } from 'ngx-az-core';

@Component({
  selector: 'confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmUserComponent {
  /**
   *
   */
  @Input()
  user!: AuthorizedUserModel;

  /**
   *
   * @param document
   * @param $store
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private $store: Store,
    @Inject(DITokens.URLS) private urls: Urls
  ) {}

  /**
   *
   * @returns
   */
  navigateToAgroId() {
    this.document.location.href = `${
      this.urls.agroId
    }/${this.$store.selectSnapshot(
      LanguageState.currentLanguage
    )}/cabinet/personal`;
  }
}
