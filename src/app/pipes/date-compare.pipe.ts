import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateCompare' })
export class DateComparePipe implements PipeTransform {

    constructor(
        public datepipe: DatePipe
    ) { }

    transform(date1: string, date2: string): boolean {
        console.log(date1, '--', date2)
        console.log(new Date(date1).setHours(0, 0, 0, 0), "--", new Date(date2).setHours(0, 0, 0, 0))
        if (new Date(date1).setHours(0, 0, 0, 0) <= new Date(date2).setHours(0, 0, 0, 0)) {
            return true;
        } else {
            return false;
        }
    }
}