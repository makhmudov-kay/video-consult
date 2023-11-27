import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'az-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverMenuComponent {
  /**
   *
   */
  @Input()
  isDrawer!: boolean;

  /**
   *
   */
  @Output()
  visiblePopover = new EventEmitter();

  /**
   *
   */
  @Output()
  visibleDrawer = new EventEmitter();

  /**
   *
   */
  openMap: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
  };

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
}
