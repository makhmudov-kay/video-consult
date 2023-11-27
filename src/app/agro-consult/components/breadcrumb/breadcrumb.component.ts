import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService, IBreadcrumb } from 'ngx-az-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'az-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  /**
   *
   */
  breadcrumbs$: Observable<IBreadcrumb[]>;

  /**
   *
   * @param $breadcrumb
   * @param router
   */
  constructor(private $breadcrumb: BreadcrumbService) {
    this.breadcrumbs$ = this.$breadcrumb.breadcrumbs$;
  }
}
