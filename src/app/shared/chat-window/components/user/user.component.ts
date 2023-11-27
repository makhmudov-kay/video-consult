import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Application } from '../../../models/application.interface';
import { Router } from '@angular/router';
import { StoreService } from 'ngx-az-core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NgClass, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'az-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzAvatarModule, NgClass, TranslateModule, NgIf],
})
export class UserComponent {
  /**
   *
   */
  @Input()
  userInfo!: Application;

  /**
   *
   */
  @Input()
  isClient!: boolean;

  /**
   *
   * @param router
   * @param $store
   */
  constructor(private router: Router, private $storeService: StoreService) {}

  /**
   *
   * @param resumeId
   */
  checkResume(resumeId: number) {
    // !!CHECK IT
    this.router.navigate([
      this.$storeService.currentLanguage,
      'main',
      'consultant',
      resumeId,
    ]);
  }
}
