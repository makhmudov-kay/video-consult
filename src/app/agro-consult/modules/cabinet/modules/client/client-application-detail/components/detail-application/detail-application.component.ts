import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationDetailResponse } from 'projects/agro-consult/src/app/shared/models/application-detail.response';

@Component({
  selector: 'az-detail-application',
  templateUrl: './detail-application.component.html',
  styleUrls: ['./detail-application.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailApplicationComponent {
  /**
   *
   */
  @Input()
  application!: ApplicationDetailResponse;

  /**
   *
   */
  @Input()
  isLoading!: boolean;

  /**
   *
   */
  @Output()
  removeApplicationId = new EventEmitter<number>();

  /**
   *
   */
  @Output()
  onChangeVisibility = new EventEmitter<boolean>();

  /**
   *
   */
  @Input()
  mobileWebView!: string | null;

  /**
   *
   * @param router
   * @param route
   * @param nzMessageService
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private nzMessageService: NzMessageService,
  ) {}

  /**
   *
   * @param id
   */
  remove(id: number) {
    this.removeApplicationId.emit(id);
  }

  /**
   *
   * @param isVisible
   */
  updateVisible(isVisible: boolean) {
    this.onChangeVisibility.emit(isVisible);
  }

  /**
   *
   */
  navigateToApplicationList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   *
   */
  confirm(): void {
    this.remove(this.application.id);
    this.nzMessageService.info('Ваша заявка удалена');
  }
}
