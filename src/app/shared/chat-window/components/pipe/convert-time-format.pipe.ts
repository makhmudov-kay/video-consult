import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTimeFormat',
})
export class ConvertTimeFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const sec = value;
    const minutes = sec / 60;
    const minutesFormat = minutes > 1 ? Math.floor(minutes) : 0;
    const secFormat = sec > 60 ? sec - minutesFormat * 60 : sec;

    return `${minutesFormat}:${secFormat < 10 ? '0' + secFormat : secFormat}`;
  }
}
