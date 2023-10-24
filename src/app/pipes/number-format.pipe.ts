import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (Math.abs(value) < 1000) {
      return `<span>${value.toString().replace('.', ',')}</span>`;
    } else if (Math.abs(value) < 1000000) {
      const thousands = (value / 1000).toFixed(2);
      return `<span class="
                text-blue-800 text-base font-medium leading-snug
              ">${thousands}</span>${' '}
              <span class="
                text-zinc-500 text-base font-medium leading-snug
              ">тис.</span>`.replace('.', ',');
    } else if (Math.abs(value) < 1000000000) {
      const millions = (value / 1000000).toFixed(2);
      return `<span class="
                text-blue-800 text-base font-medium leading-snug
              ">${millions}</span>${' '}
              <span class="
                text-zinc-500 text-base font-medium leading-snug
              ">млн.</span>`.replace('.', ',');
    } else {
      const billions = (value / 1000000000).toFixed(2);
      return `<span class="
                text-blue-800 text-base font-medium leading-snug
              ">${billions}</span>${' '}
              <span class="
                text-zinc-500 text-base font-medium leading-snug
              ">млрд.</span>`.replace('.', ',');
    }
  }
}
