import { HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MyApplicationsResponse } from 'projects/agro-consult/src/app/shared/models/my-application.response';
import { MyApplicationService } from 'projects/agro-consult/src/app/shared/services/my-application.service';
import { map, Observable } from 'rxjs';
import { ConsultantListComponent } from '../shared/consultant-list/consultant-list.component';

@Component({
  selector: 'az-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  /**
   * 
   */
  @ViewChild(ConsultantListComponent)
  consultantList!: ConsultantListComponent;

  /**
   *
   */
  applications$!: Observable<MyApplicationsResponse[]>;

  /**
   *
   */
  get isUserAuthetificate() {
    return !this.$jwtHelper.isTokenExpired();
  }

  /**
   * 
   * @param $myApplications 
   * @param $jwtHelper 
   */
  constructor(
    private $myApplications: MyApplicationService,
    private $jwtHelper: JwtHelperService
  ) {}

  /**
   *
   * @param limit
   */
  private getApplications(limit: number) {
    const params = new HttpParams().append('limit', limit);
    this.applications$ = this.$myApplications
      .get(params)
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  ngOnInit(): void {
    if (this.isUserAuthetificate) {
      this.getApplications(3);
    }
  }

  /**
   *
   * @param categoryId
   */
  handleCategory(categoryId: number) {      
      this.consultantList.categoryId = categoryId;
      this.consultantList.filterData();
  }
}
