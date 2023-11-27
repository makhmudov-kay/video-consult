import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'az-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  /**
   *
   */
  searchValue = '';

  /**
   *
   */
  @Output()
  searchText = new EventEmitter<string>();

  /**
   *
   * @param clear
   * @returns
   */
  submit(clear = false) {
    if (clear) {
      this.searchValue = '';
      this.searchText.emit(this.searchValue);
      return;
    }

    this.searchText.emit(this.searchValue);
  }
}
