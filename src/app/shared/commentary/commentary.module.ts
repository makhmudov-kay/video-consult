import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentaryComponent } from './commentary.component';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  imports: [
    CommonModule,
    /* NG-ZORRO */
    NzCommentModule,
    NzListModule,
    NzAvatarModule,
    NzDividerModule,
  ],
  declarations: [CommentaryComponent],
  exports: [CommentaryComponent],
})
export class CommentaryModule {}
