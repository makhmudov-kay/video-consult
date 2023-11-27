import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    /* NG-ZORRO */
    NzAvatarModule,
  ],
  declarations: [UserInfoComponent],
  exports: [UserInfoComponent],
})
export class UserInfoModule {}
