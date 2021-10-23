import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatearTitulo'
})
export class FormatearTituloPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): any {
        let msj = '';
        value == '0' ? msj : (msj = ' - $' + value);
        return msj;
    }
}
