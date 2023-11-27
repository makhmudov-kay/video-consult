import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { DataState, NgDestroy, CheckHasResume } from 'ngx-az-core';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'az-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  /**
   *
   */
  @Select(DataState.checkHasResume)
  checkHasResume$!: Observable<CheckHasResume>;

  /**
   *
   */
  isVisible = false;

  /**
   *
   */
  handleCancel() {
    this.isVisible = false;
  }
}
