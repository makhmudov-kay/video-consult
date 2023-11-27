import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { addDays, formatDistance } from 'date-fns';

@Component({
  selector: 'az-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentaryComponent {
  /**
   *
   */
  @Input()
  reviews!: any; //TODO INTERFACE

  /**
   *
   */
  data = [
    {
      author: 'Марина',
      avatar: './assets/images/temp/avatar-comment-1.jpg',
      content:
        'Добрый Вечер!!!!Я хочу выразить свою благодарность Кулишову Алексею Владимировичу и всей его команде,ассистентам за грамотное отношение к животному(в моём случае,к котёнку),очень ответственные,добрые,человечные и грамотные люди!!!!Побольше бы таких!Спасибо Вам огромное.СПАСИБО,что Вы есть!',
      datetime: formatDistance(new Date(), addDays(new Date(), 1)),
    },
    {
      author: 'Мингазова Нина',
      avatar: './assets/images/temp/avatar-comment-2.jpg',
      content:
        'Очень хочется сказать СПАСИБО Юрию Вячеславовичу и всему его коллективу за нашу маленькую Кнопу и подаренную надежду!!!',
      datetime: formatDistance(new Date(), addDays(new Date(), 2)),
    },
    {
      author: 'Валерия Гузеева',
      avatar: './assets/images/temp/avatar-comment-3.jpg',
      content:
        'Благодарность доктору Кулишову за выздоровление нашего любимца, кота Муската. Лечение было долгим, спасибо за терпение)). Очень доброжелательный и внимательный врач, да и просто душевный человек! Коллектив, кто бы ни был на смене, так же неизменно доброжелателен, спасибо!',
      datetime: formatDistance(new Date(), addDays(new Date(), 35)),
    },
  ];
}
