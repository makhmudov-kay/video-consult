import { Observable, filter } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Select } from '@ngxs/store';
import { DataState, UserInfo } from 'ngx-az-core';

@Component({
  selector: 'az-cabinet-menu',
  templateUrl: './cabinet-menu.component.html',
  styleUrls: ['./cabinet-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CabinetMenuComponent implements OnInit {
  /**
   *
   */
  @Input()
  hasResume!: boolean;

  /**
   *
   */
  @Input()
  resumeCount!: number;

  /**
   *
   */
  horizontalMenu = false;

  /**
   *
   */
  isConsultant = false;

  /**
   *
   */
  @Select(DataState.getUserInfo)
  userInfo$!: Observable<UserInfo | null>;

  /**
   *
   */
  openMap: { [name: string]: boolean } = {
    sub1: this.checRouterIncludesPath('client'),
    sub2: this.checRouterIncludesPath('consultant'),
  };

  /**
   *
   * @param router
   */
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          const client = this.checRouterIncludesPath('client', e.url);
          client ? this.openHandler('sub1') : this.openHandler('sub2');
        }
      });
  }

  /**
   *
   */
  ngOnInit() {
    if (window.innerWidth < 992) {
      this.horizontalMenu = true;
    } else if (window.innerWidth > 992) {
      this.horizontalMenu = false;
    }
  }

  /**
   *
   * @param value
   */
  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  /**
   *
   * @param path
   * @returns
   */
  checRouterIncludesPath(path: string, url?: string) {
    if (!url) {
      return this.router.url.split('/').includes(path);
    }

    if (url) {
      return url.split('/').includes(path);
    }

    return false;
  }

  /**
   *
   * @param event
   */
  onResize(event: NzSafeAny) {
    if (event.target.innerWidth < 992) {
      this.horizontalMenu = true;
    } else if (event.target.innerWidth > 992) {
      this.horizontalMenu = false;
    }
  }
}
