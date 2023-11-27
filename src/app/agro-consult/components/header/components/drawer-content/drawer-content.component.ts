import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'az-drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContentComponent {
  /**
   * 
   */
  @Input()
  isUserAuthetificate!: boolean;

  /**
   * 
   */
  @Input()
  isHasResume!: boolean;

  /**
   *
   */
  @Output()
  closeDrawer = new EventEmitter();
}
