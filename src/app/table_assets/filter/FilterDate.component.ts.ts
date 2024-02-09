import { Component, Inject, LOCALE_ID } from '@angular/core';
import { DOCUMENT, formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OlympicWinnersService } from "../../olympic-winners.service";
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/consts';

@Component({
  selector: "date-cell",
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

  <mat-form-field style="height: 100%; width: calc(100% - 100px);">
  <mat-label style="color: white; font-size: 90%">mm/dd/yyyy</mat-label>
    <input 
      matInput 
      [matDatepicker]="picker" 
      [value]="selectedDate" 
      (dateInput)="typeEvent($event)"
      (keydown.enter)="onKeydown($event)"
      (dateChange)="onDateChanged($event)" />
    <mat-datepicker-toggle style="color: white;" matSuffix [for]="picker"></mat-datepicker-toggle>

    <button mat-icon-button matSuffix (click)="clearDate()">
      <span class="material-symbols-outlined">
        close
      </span>
    </button>

    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>
  `
})
export class FilterDateComponent {
  constructor(
    public olympicWinnersService: OlympicWinnersService,
    public http: HttpClient,
    @Inject(DOCUMENT) public _document: Document,
    @Inject(LOCALE_ID) public locale: string
  ){}

  private params: any;
  public selectedDate = null;
  private date: Date;
  events: string[] = [];

  agInit(params: any): void {
    this.params = params;
  }

  getValue = () => {
    let dateString = null;
    if (this.selectedDate) {
      dateString = formatDate(this.selectedDate, "yyyy-MM-dd",'en-US');
    }
    return dateString;
  };

  getDate(): Date {
    this.filterDate(this.selectedDate);
    return this.date;
  }

  typeEvent(event: MatDatepickerInputEvent<Date>) {
    this.events[0] = (`${event.value}`);
  }

  afterGuiAttached = () => {
    if (!this.params.value) {
      return;
    }
    this.setDate(this.params.value);
  };

  onKeydown($event){
    this.setDate(this.events[0]);
  }

  onDateChanged = event => {
    let date = event.value;
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    this.selectedDate = date;
    this.date = this.selectedDate;
    this.params.onDateChanged();
  }

  clearDate() {
    this.selectedDate = "";
    this.date = null;
    this.events[0] = "";
    this.params.onDateChanged();
  }

  setDate(value){
    const date = new Date(Date.parse(value));
    let selectedDate = new Date( date.getTime() + Math.abs(date.getTimezoneOffset()*60000) );
    this.selectedDate = selectedDate;
  }

  filterDate(date: Date): void {
    this.date = date;
  }
}