import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'millis2date',
    standalone: true
})
export class MillisToDatePipe implements PipeTransform {
    transform(fileName: string) {
        const millis = Number(fileName.split('.')[0])

        const date = new Date(millis)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }
}