import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const [hours, minutes] = value.split(':');
    return `${hours}:${minutes}`;
  }
}
