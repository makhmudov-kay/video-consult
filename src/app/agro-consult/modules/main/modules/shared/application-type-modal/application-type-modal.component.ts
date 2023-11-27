import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'ngx-az-core';

@Component({
  selector: 'az-application-type-modal',
  templateUrl: './application-type-modal.component.html',
  styleUrls: ['./application-type-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationTypeModalComponent {
  /**
   *
   */
  @Input()
  isVisible!: boolean;

  /**
   *
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  /**
   *
   */
  radioValue = 'create-application';

  /**
   *
   * @param router
   * @param $store
   */
  constructor(private router: Router, private $storeService: StoreService) {}

  /**
   *
   */
  handleCancel() {
    this.isVisibleChange.emit(false);
  }

  /**
   *
   */
  handleOk() {
    if (this.radioValue === 'private') {
      this.router.navigate([
        this.$storeService.currentLanguage,
        'main',
        'application-type',
        this.radioValue,
      ]);
    } else {
      this.router.navigate([
        this.$storeService.currentLanguage,
        'main',
        this.radioValue,
      ]);
    }
  }
}
