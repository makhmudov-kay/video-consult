import { Component, Input } from '@angular/core';
import { FAQResponse } from './model/f-a-q.response';
import { TranslateModule } from '@ngx-translate/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedModule } from 'ngx-az-core';

@Component({
  selector: 'az-f-a-q',
  standalone: true,
  imports: [SharedModule, TranslateModule, NzCollapseModule, NzIconModule],
  templateUrl: './f-a-q.component.html',
  styleUrls: ['./f-a-q.component.less'],
})
export class FAQComponent {
  /**
   *
   */
  @Input()
  faqsData!: FAQResponse[];
}
