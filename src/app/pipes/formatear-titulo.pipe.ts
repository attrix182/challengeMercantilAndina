import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearTitulo'
})
export class FormatearTituloPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {
    if(value == '0'){
      return "";
    }
    else{
      return ' - $' + value
    }
    
  }

}
