import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'ngx-az-core';

@Component({
  selector: 'az-modal-actions',
  templateUrl: './modal-actions.component.html',
  styleUrls: ['./modal-actions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalActionsComponent {
  /**
   *
   */
  @Input()
  current!: number;

  /**
   *
   */
  @Input()
  resumeCount!: number;

  /**
   *
   */
  @Input()
  edit?: string;

  /**
   *
   */
  @Input()
  isLoading!: boolean;

  /**
   *
   */
  @Input()
  isError!: boolean;

  /**
   *
   */
  @Input()
  disableBtn!: boolean;

  /**
   *
   */
  @Output()
  previous = new EventEmitter();

  /**
   *
   */
  @Output()
  nextStep = new EventEmitter();

  /**
   *
   */
  @Output()
  createResume = new EventEmitter();

  /**
   *
   * @param router
   * @param route
   * @param $store
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private $storeService: StoreService
  ) {}

  /**
   *
   */
  pre() {
    this.previous.emit();
  }

  /**
   *
   */
  next() {
    this.nextStep.emit();
  }

  /**
   *
   */
  create() {
    this.createResume.emit();
  }

  /**
   *
   */
  navigateTo() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  /**
   *
   */
  navigateToMyResume() {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'consultant',
      'resume',
    ]);
  }
}
