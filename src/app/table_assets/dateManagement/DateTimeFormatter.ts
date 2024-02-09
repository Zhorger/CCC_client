import { Component, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'datetime-cell',
    template: `<span>{{ formatTheDate(params.value) }}</span>`
})
export class DateTimeRenderer{

    public params: ICellRendererParams; 

    constructor(@Inject(LOCALE_ID) public locale: string) { }

    public formatTheDate(dateVal) {
        //  Convert a date like "2020-01-16T13:50:06.26" into a readable format
        if (dateVal == null) {
            return "";
        }
        return formatDate(dateVal, 'yyyy/MM/dd', this.locale);
    }

    public onChange(event) {
        this.params.data[this.params.colDef.field] = event.currentTarget.checked;
    }
}