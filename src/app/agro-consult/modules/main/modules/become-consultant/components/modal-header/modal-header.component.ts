import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'az-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent {
  /**
   *
   */
  @Input()
  title!: string;

  /**
   *
   * @param router
   * @param route
   */
  constructor(private router: Router, private route: ActivatedRoute) {}

  /**
   *
   */
  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
