import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'az-logo-consultant',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less'],
})
export class LogoComponent {
  /**
   *
   */
  @Input() placement!: string;
}
