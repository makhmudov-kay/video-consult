import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserInfo } from '../models/search-application.interface';

@Component({
  selector: 'az-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  /**
   *
   */
  @Input()
  userInfo!: UserInfo;

  /**
   *
   */
  @Input()
  isChat = false;

  /**
   *
   */
  @Input()
  avatarSize = 64;
}
