import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'az-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less'],
})
export class PaginationComponent {
  /**
   *
   */
  @Input()
  pageSize!: number;

  /**
   *
   */
  @Input()
  total!: number;

  /**
   *
   */
  @Input()
  pageIndex!: number;

  /**
   *
   */
  @Output()
  pageIndexChange = new EventEmitter<number>();
}
