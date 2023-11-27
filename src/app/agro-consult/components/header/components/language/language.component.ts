import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-language-custom',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageComponent {}
