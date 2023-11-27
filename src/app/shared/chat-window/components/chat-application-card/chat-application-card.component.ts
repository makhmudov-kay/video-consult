import { DecimalPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Application } from '../../../models/application.interface';

@Component({
  selector: 'az-chat-application-card',
  templateUrl: './chat-application-card.component.html',
  styleUrls: ['./chat-application-card.component.less'],
  standalone: true,
  imports: [RouterLink, NgIf, DecimalPipe, TranslateModule],
})
export class ChatApplicationCardComponent {
  /**
   *
   */
  @Input()
  isMobileDevice!: boolean;

  /**
   *
   */
  @Input()
  application!: Application;
}
