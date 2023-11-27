import { ActivatedRoute } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'az-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantComponent implements OnInit {
  /**
   *
   */
  isVisibleMenu = false;

  /**
   *
   */
  isMobileDevice = false;

  /**
   * 
   * @param route 
   * @param cd 
   */
  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    if (this.route.snapshot.fragment) {
      this.isMobileDevice = true;
      this.cd.markForCheck();
    }
  }

  /**
   *
   */
  ngOnInit() {
    if (window.innerWidth < 992) {
      this.isVisibleMenu = true;
    } else if (window.innerWidth > 991) {
      this.isVisibleMenu = false;
    }
  }

  /**
   *
   * @param e
   */
  @HostListener('window:resize', ['$event'])
  onResize(e: NzSafeAny) {
    if (e.target.innerWidth < 992) {
      this.isVisibleMenu = true;
    } else if (e.target.innerWidth > 991) {
      this.isVisibleMenu = false;
    }
  }
}
