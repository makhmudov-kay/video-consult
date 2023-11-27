import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { LanguageComponent } from './components/language/language.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UzimiznikiLogoComponent } from './components/logo/logo.component';

SwiperCore.use([Pagination, Navigation, Autoplay, EffectFade]);

type ConsultantType =
  | 'accountant'
  | 'veterinarian'
  | 'agronomist'
  | 'developer'
  | 'lawyer';

type Logo = 'consultant' | 'uzimizniki';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    LogoComponent,
    UzimiznikiLogoComponent,
    NzButtonModule,
    SwiperModule,
    LanguageComponent,
    TranslateModule,
    NgIf,
    NgSwitch,
    NgSwitchCase,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('swiper')
  swiper!: SwiperComponent;

  /**
   *
   */
  @Input()
  telegrambot = true;
  /**
   *
   */
  @Input()
  logo: Logo = 'consultant';
  /**
   *
   */
  @Input()
  consultant = true;
  /**
   * 
   */
  @Input()
  uzimizniki = false
  /**
   * 
   */
  @Input()
  bannerData = [
    {
      type: 'accountant',
      innerHTML: `
      <h1>Станьте нашим консультантом</h1>
      <p class="mt-40">
        Вы обладаете экспертными знаниями в какой-либо области и хотите ими
        поделиться? Мы предлагаем удобную платформу для проведения онлайн
        консультаций, доступ к аудитории и поддержку для вашего
        профессионального развития. Ваша помощь может быть ценной для тех, кто
        ищет решения или советы в различных сферах жизни.
      </p>
      <p class="mt-25">Области консультаций: <span>Бухгалтер</span></p>
      <p class="mt-25">
        И еще много других. Делитесь своими знаниями, помогайте другим и
        развивайтесь вместе с нами!
      </p>

      `,
      image: './assets/images/img_accountant.png',
    },
    {
      type: 'veterinarian',
      innerHTML: `
      <h1>Станьте нашим консультантом</h1>
      <p class="mt-40">
        Вы обладаете экспертными знаниями в какой-либо области и хотите ими
        поделиться? Мы предлагаем удобную платформу для проведения онлайн
        консультаций, доступ к аудитории и поддержку для вашего
        профессионального развития. Ваша помощь может быть ценной для тех, кто
        ищет решения или советы в различных сферах жизни.
      </p>
      <p class="mt-25">Области консультаций: <span>Ветеринар</span></p>
      <p class="mt-25">
        И еще много других. Делитесь своими знаниями, помогайте другим и
        развивайтесь вместе с нами!
      </p>

      `,
      image: './assets/images/img_veterinarian.png',
    },
    {
      type: 'agronomist',
      innerHTML: `
      <h1>Станьте нашим консультантом</h1>
      <p class="mt-40">
        Вы обладаете экспертными знаниями в какой-либо области и хотите ими
        поделиться? Мы предлагаем удобную платформу для проведения онлайн
        консультаций, доступ к аудитории и поддержку для вашего
        профессионального развития. Ваша помощь может быть ценной для тех, кто
        ищет решения или советы в различных сферах жизни.
      </p>
      <p class="mt-25">Области консультаций: <span>Агроном</span></p>
      <p class="mt-25">
        И еще много других. Делитесь своими знаниями, помогайте другим и
        развивайтесь вместе с нами!
      </p>


      `,
      image: './assets/images/img_agronomist.png',
    },
    {
      type: 'developer',
      innerHTML: `
      <h1>Станьте нашим консультантом</h1>
      <p class="mt-40">
        Вы обладаете экспертными знаниями в какой-либо области и хотите ими
        поделиться? Мы предлагаем удобную платформу для проведения онлайн
        консультаций, доступ к аудитории и поддержку для вашего
        профессионального развития. Ваша помощь может быть ценной для тех, кто
        ищет решения или советы в различных сферах жизни.
      </p>
      <p class="mt-25">Области консультаций: <span>Программист</span></p>
      <p class="mt-25">
        И еще много других. Делитесь своими знаниями, помогайте другим и
        развивайтесь вместе с нами!
      </p>

      `,
      image: './assets/images/img_developer.png',
    },
    {
      type: 'lawyer',
      innerHTML: `
      <h1>Станьте нашим консультантом</h1>
      <p class="mt-40">
        Вы обладаете экспертными знаниями в какой-либо области и хотите ими
        поделиться? Мы предлагаем удобную платформу для проведения онлайн
        консультаций, доступ к аудитории и поддержку для вашего
        профессионального развития. Ваша помощь может быть ценной для тех, кто
        ищет решения или советы в различных сферах жизни.
      </p>
      <p class="mt-25">Области консультаций: <span>Юрист</span></p>
      <p class="mt-25">
        И еще много других. Делитесь своими знаниями, помогайте другим и
        развивайтесь вместе с нами!
      </p>

      `,
      image: './assets/images/img_lawyer.png',
    },
  ];

  currentConsultantType?: ConsultantType;

  /**
   *
   */
  route = inject(ActivatedRoute);

  /**
   *
   */
  ngAfterViewInit(): void {
    const consultantType = this.route.snapshot.params['consultantType'];
    const currentConsultantIndex = this.bannerData.findIndex(
      (x) => x.type === consultantType
    );
    if (currentConsultantIndex >= 0) {
      this.currentConsultantType = consultantType;
      this.chooseSlide(currentConsultantIndex);
    }
  }

  /**
   *
   * @param index
   * @param swiper
   */
  chooseSlide(index: number) {
    this.swiper.swiperRef.slideTo(index + 1);
    this.swiper.swiperRef.autoplay.stop();
  }
}
