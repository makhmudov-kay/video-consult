import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { InitialDataService, Project, SEOService } from 'ngx-az-core';
import { VideoCallService } from './shared/services/video-call.service';

/**
 * for changing main.js hash value
 */
const today = '13.07.2023';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  /**
   *
   */
  id$ = this.$videoCall.id$.asObservable();

  /**
   *
   */
  application$ = this.$videoCall.application$.asObservable();

  /**
   *
   */
  profileId$ = this.$videoCall.profileId$.asObservable();

  /**
   *
   */
  authuserid$ = this.$videoCall.authuserid$.asObservable();

  /**
   *
   * @param $videoCall
   * @param $initialData
   * @param $store
   */
  constructor(
    private $videoCall: VideoCallService,
    private $initialData: InitialDataService,
    private $seo: SEOService
  ) {
    this.$initialData.dispatchAuthorizedUser();
    this.$initialData.dispatchLanguages().subscribe();
  }

  ngOnInit(): void {
    const project = Project.agroConsult;
    this.$seo.addMetaTags(project);
    this.$seo.createCanonicalLink();
    this.$seo.appendLanguages(project);
  }

  /**
   *
   * @param isJoined
   */
  listenJoinedUsers(isJoined: boolean) {
    this.$videoCall.listenJoinedUsers$.next(isJoined);
  }

  /**
   *
   * @param isStreaming
   */
  isStreamingHandler(isStreaming: boolean) {
    this.$videoCall.isStreamingHandler$.next(isStreaming);
  }
}
