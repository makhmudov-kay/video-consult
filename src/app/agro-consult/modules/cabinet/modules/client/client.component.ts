import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'az-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnInit {
  isVisibleMenu = false;

  ngOnInit() {
    if (window.innerWidth < 992) {
      this.isVisibleMenu = true;
    } else if (window.innerWidth > 991) {
      this.isVisibleMenu = false;
    }
  }

  onResize(e: any) {
    if (e.target.innerWidth < 992) {
      this.isVisibleMenu = true;
    } else if (e.target.innerWidth > 991) {
      this.isVisibleMenu = false;
    }
  }
}
