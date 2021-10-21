import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearGranizo'
})
export class FormatearGranizoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(value)
    {
      return 'Cubre'
    }
    else{
      return 'No cubre'
    }

  }

}
