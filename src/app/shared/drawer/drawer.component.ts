import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'az-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  /**
   *
   */
  @Input()
  visible!: boolean;

  /**
   *
   */
  @Input()
  height!: string;

  /**
   *
   */
  @Input()
  placement!: NzDrawerPlacement;

  /**
   *
   */
  @Output()
  closeDrawer = new EventEmitter<boolean>();

  /**
   *
   */
  close() {
    this.closeDrawer.emit(false);
  }
}
