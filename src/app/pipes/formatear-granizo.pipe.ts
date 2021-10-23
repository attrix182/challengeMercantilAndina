import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatearGranizo'
})
export class FormatearGranizoPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        let msj = 'No cubre';

        value ? (msj = 'Cubre') : msj;

        return msj;
    }
}
