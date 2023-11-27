import { NzFormModule } from 'ng-zorro-antd/form';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

    /* NG-ZORRO */
    NzInputModule,
    NzIconModule,
    NzTypographyModule,
  ],
  declarations: [SearchInputComponent],
  exports: [SearchInputComponent],
})
export class SearchInputModule {}
