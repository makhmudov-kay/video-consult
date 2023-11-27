import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinksComponent {}
