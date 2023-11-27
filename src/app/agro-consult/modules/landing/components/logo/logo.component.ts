import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'az-logo-uzimizniki',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less'],
})
export class UzimiznikiLogoComponent {
  /**
   *
   */
  @Input() placement!: string;
}
