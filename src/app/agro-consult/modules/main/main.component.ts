import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'az-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  /**
   *
   */
  get hidden() {
    return (
      this.router.url.includes('home') || this.router.url.includes('404')
    );
  }

  constructor(private router: Router) {}
}
