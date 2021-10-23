import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatearDescripcion'
})
export class FormatearDescripcionPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        return value.replace('±', 'ñ');
    }
}
