import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { StoreService } from 'ngx-az-core';

@Component({
  selector: 'az-empty-application',
  templateUrl: './empty-application.component.html',
  styleUrls: ['./empty-application.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyApplicationComponent {
  /**
   *
   */
  @Input()
  searchApplication!: boolean;

  /**
   *
   * @param router
   * @param $store
   */
  constructor(private router: Router, private $storeService: StoreService) {}

  /**
   *
   */
  navigateToSearch() {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'consultant',
      'search',
    ]);
  }
}
