import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { DataState, UserInfo } from 'ngx-az-core';
import { Select } from '@ngxs/store';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'az-tg-bot-link',
  templateUrl: './tg-bot-link.component.html',
  styleUrls: ['./tg-bot-link.component.less'],
  standalone: true,
  imports: [NgIf, AsyncPipe, TranslateModule, NgClass],
})
export class TgBotLinkComponent {
  /**
   *
   */
  @Select(DataState.getUserInfo)
  userInfo$!: Observable<UserInfo | null>;

  /**
   *
   */
  @Input()
  whiteBg = false;

  /**
   *
   */
  @Input()
  ellipse = false;
}
