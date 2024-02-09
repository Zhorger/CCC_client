import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-loading-overlay',
  template: `
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <style>
    .material-symbols-outlined {
      font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24
    }
    </style>

  <mat-form-field style="height: 100%; width: 100%;">
    <input 
      matInput 
      [matDatepicker]="picker" 
      [value]="selectedDate" 
      (dateInput)="typeEvent($event)"
      (keydown.enter)="onKeydown($event)"
      (dateChange)="onDateChanged($event)"
      [max]="maxDate" />
    <mat-datepicker-toggle style="color: white;" matSuffix [for]="picker"></mat-datepicker-toggle>

    <button mat-icon-button matSuffix (click)="clearDate()">
      <span class="material-symbols-outlined">
        close
      </span>
    </button>

    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>
  `,
})
export class CellDateComponent implements ICellEditorAngularComp{
  private params: any;
  public selectedDate = null;
  private dateString;
  events: string[] = [];
  maxDate: Date;
  currentDate: any;

  constructor(){
    let d = new Date();
    this.currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  // Initilize Variables - Setting up max date case
  agInit(params: any): void {
    this.params = params;
    if(this.params.column.colId === 'complete_date_a'){  
      this.maxDate = new Date(this.currentDate);
    }
  }

  getValue = () => {
    if (this.selectedDate) {
      this.dateString = formatDate(this.selectedDate, "yyyy-MM-dd", 'en-US');
    }
    return this.dateString;
  };

  typeEvent(event: MatDatepickerInputEvent<Date>) {
    this.events[0] = (`${event.value}`);
  }

  onKeydown($event){
    this.setDate(this.events[0]);
  }

  // Once user selects a specific date
  afterGuiAttached = () => {
    console.log('HIt')
    if (!this.params.value) {
      return;
    }
    this.setDate(this.params.value);
  };

  onDateChanged = event => {
    let date = event.value;
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    this.selectedDate = date;
  }

  clearDate() {
    this.dateString = null;
    this.selectedDate = null;
  }

  setDate(value){
    const date = new Date(Date.parse(value));
    let selectedDate = new Date( date.getTime() + Math.abs(date.getTimezoneOffset()*60000) );
    this.selectedDate = selectedDate;
  }
}

