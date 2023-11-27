import { filter } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  NavigationStart,
} from '@angular/router';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

@Component({
  selector: 'az-agro-consult',
  templateUrl: './agro-consult.component.html',
  styleUrls: ['./agro-consult.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animation', [
      transition('* => go', [
        useAnimation(fadeIn, {
          params: {
            timing: 0.5,
          },
        }),
      ]),
    ]),
  ],
})
export class AgroConsultComponent {

  /**
   *
   */
  isCabinet = false;

  /**
   *
   */
  isMobileDevice = false;

  /**
   *
   */
  runFadeIn = false;

  /**
   *
   * @param router
   * @param route
   * @param cd
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.router.events
      .pipe(
        filter(
          (e): e is NavigationEnd | NavigationStart =>
            e instanceof NavigationEnd || e instanceof NavigationStart
        )
      )
      .subscribe((e) => {
        this.isCabinet = this.router.url.split('/').includes('cabinet');
        if (e instanceof NavigationEnd) {
          this.runFadeIn = true;
        } else {
          this.runFadeIn = false;
        }
        this.cd.markForCheck();
      });

    if (this.route.snapshot.fragment) {
      this.isMobileDevice = true;
      cd.markForCheck();
    }
  }
}
