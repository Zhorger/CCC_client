import { 
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input, NgZone, ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavBarService } from 'src/app/services/navbar.service';
import { TableService } from 'src/app/services/table.service';

export interface DialogData { }
  
  @Component({
      selector: 'app-table-list',
      template: `
      <div class="table-div" id="div{{this.tableCtr}}">
        <button id="tablebtn{{this.tableCtr}}" class="table-button" mat-flat-button (click)="goToTable()">
          <a class="black-a">
            <strong>
              {{ table_name$ }}
            </strong>
          </a>
        </button>
        <app-edittable-popup></app-edittable-popup>
      <div>
      `,
      styleUrls: ['tableList.component.scss'],
      changeDetection: ChangeDetectionStrategy.OnPush,
  })
  
  export class TableListComponent {

    someSubscription: any;
    client: string;
    table_name$: string;
    tableCtr: number;
    colArr: Array<any> = new Array;
    colType: Array<any> = new Array;
    fileArr: Array<any> = new Array;
    fileType: Array<any> = new Array;

    constructor(
      private tableService: TableService,
      private navbarService: NavBarService,
      public zone: NgZone,
    ){      
      let temp = this.tableService.loadTable();
      this.client      = temp[0];
      this.table_name$ = temp[1];
      this.tableCtr    = this.tableService.getTableCtr();
      console.log(this.client);
      console.log(this.table_name$);
      console.log(this.tableCtr);
    }

    ngAfterViewInit(){
      this.checkCategory();
      this.colArr   = this.tableService.getColArr();
      this.colType  = this.tableService.getColType();
      this.fileArr  = this.tableService.getFileArr();
      this.fileType = this.tableService.getFileType();
      this.navbarService.setColArr(this.colArr);
      this.navbarService.setColType(this.colType);
      this.navbarService.setFileArr(this.fileArr);
      this.navbarService.setFileType(this.fileType);
    }

    checkCategory(){
      console.log("This has ran!")
      let tempId = "tablebtn" + this.tableCtr;
      let divId = "div" + this.tableCtr;
      let tableDiv = document.getElementById(tempId);
      let docId = document.getElementById(divId);
      tableDiv.classList.add(this.client);
      docId.classList.add(this.client);
    }

    goToTable(){

    }

  }