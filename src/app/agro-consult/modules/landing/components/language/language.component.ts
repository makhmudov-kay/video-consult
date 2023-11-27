import { Component, Inject } from '@angular/core';
import { AsyncPipe, DOCUMENT, NgClass, NgFor } from '@angular/common';
import { LanguageHelper } from 'ngx-az-core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgClass],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.less'],
})
export class LanguageComponent extends LanguageHelper {
  constructor(
    protected override router: Router,
    protected override translate: TranslateService,
    protected override $store: Store,
    @Inject(DOCUMENT) protected override document: Document
  ) {
    super(router, translate, $store, document);
  }
}
