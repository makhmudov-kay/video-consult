import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'az-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /**
   *
   */
  hidden = false;

  /**
   *
   * @param router
   * @param cd
   */
  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.hidden = e.url.split('/').includes('cabinet');
        this.cd.markForCheck();
      });
  }
}
