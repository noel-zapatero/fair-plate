import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'ars', standalone: true })
export class ArsCurrencyPipe implements PipeTransform {
    transform(value: number | null | undefined, decimals = 2): string {
        if (value === null || value === undefined || isNaN(value)){
            return ''
        };

        const fixed = value.toFixed(decimals);
        const [intPart, decPart] = fixed.split('.');

        const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        if (decimals === 0){
            return intFormatted
        };
        
        return `${intFormatted},${decPart}`;
    }
}