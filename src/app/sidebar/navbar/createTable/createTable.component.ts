import { ChangeDetectionStrategy, Component, LOCALE_ID, Inject, Input, ComponentFactoryResolver, ElementRef, Type, ChangeDetectorRef, ViewChild, ViewContainerRef  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { API_URL } from 'src/app/consts';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { TableService } from 'src/app/services/table.service';
import { NavBarService } from 'src/app/services/navbar.service';
import { TableListComponent } from './table_list/tableList.component';

@Component({
    selector: 'app-table-popup',
    template: `
    <button class="table-create black-a" mat-raised-button color="success" (click)="openDialog()"
    id="create" style="margin-bottom: 15px; background: #1b7c31;">
      <a><strong>Create New Table</strong></a>
    </button> 
  `,
    styleUrls: ['createTable.component.scss'],
})

export class TablePopupComponent {
  params;
  table_name               : String;
  
  constructor(
    private tableService: TableService,
    private navbarService: NavBarService,
    public dialog: MatDialog,     
    public http: HttpClient,
    @Inject(DOCUMENT) public _document: Document,
    @Inject(LOCALE_ID) public locale: string,
  ) { }

  refresh(params?: any): boolean {
    return true;
  }

  openDialog() {
    console.log('Dialog OPEN!');
    this.navbarService.popupOpen();
    const dialogRef = this.dialog.open(TablePopupComponentClose,  {
      disableClose: true,
      data: {
        table_name           :this.table_name,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.navbarService.popupClose();
      if(result){
        this.table_name = result;
      }
    });
  }

}

//
//
//
// #########################################
// #########################################
// #########################################
// #########################################
// #########################################
// #########################################
//
//
//
  
  @Component({
      selector: 'app-table-popupclose',
      template: `
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <h1 mat-dialog-title style="margin: 0 0 10px">Table Form</h1>

      <div mat-dialog-content class="mat-typography dialog popup" style="height: 65vh; max-height: 65vh;">
        <mat-tab-group>
          <mat-tab label="Table Information">
            <button class="column-create" mat-button (click)="addColumn()"
            id="create">
              <a class="black-a"><strong>Add Column</strong></a>
            </button> 
            <div style="width: 100%; border-bottom: 1px solid #ccc;"></div>
            <section class="layout" (change)="onTextChanged($event)">
                <div>
                    <form>
                      <p class="no_marg"><label for="category">Category:</label></p>
                      <select id="category" class="line" required>
                        <option> Select Category </option>
                        <option value="tmobiles">T-Mobile</option>
                        <option value="dishs">Dish</option>
                        <option value="starlinks">Starlink</option>
                        <option value="references">Reference</option>
                        <option value="extras">Extra</option>
                      </select>
                    </form>
                </div>
                <div>
                    <form>
                      <p class="no_marg"><label for="table_name">Table Name:</label></p>
                      <textarea class="line" id="table_name" name="siteViewForm">{{table_name}}</textarea>
                    </form>
                </div>
                <ng-container #columnContainer></ng-container>
            </section>
          </mat-tab>
          <mat-tab label="Files">
            <button class="column-create" mat-button (click)="addFileField()"
            id="create">
              <a class="black-a"><strong>Add File</strong></a>
            </button> 
            <div style="width: 100%; border-bottom: 1px solid #ccc;"></div>
            <section class="layout" (change)="onTextChanged($event)">
                <ng-container #fileContainer></ng-container>
            </section>
          </mat-tab>
        </mat-tab-group>
      </div>
        
      <mat-dialog-actions align="end">
        <button mat-button [mat-dialog-close]="">Cancel</button>
        <button mat-button color="primary" cdkFocusInitial (click)="createTable()" [mat-dialog-close]="[table_name, category]">Create Table</button>
      </mat-dialog-actions>   
      `,
      styleUrls: ['createTable.component.scss'], 
      changeDetection: ChangeDetectionStrategy.OnPush,
  })
  
  export class TablePopupComponentClose {

  @ViewChild('columnContainer', {read: ViewContainerRef, static: true})
  columnContainer: ViewContainerRef;
  @ViewChild('fileContainer', {read: ViewContainerRef, static: true})
  fileContainer: ViewContainerRef;
  container: any;
  private tableList = this.componentFactoryResolver.resolveComponentFactory(TableListComponent);  
  private colList = this.componentFactoryResolver.resolveComponentFactory(ColumnComponent);
  private fileList = this.componentFactoryResolver.resolveComponentFactory(FileFieldComponent);
  component: any;
  table_name: string;
  category: string;
  counter: number = 1;
  fileCounter: number = 1;
  
  
  constructor(
    public dialogRef: MatDialogRef<TablePopupComponentClose>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) public _document: Document,
    public http: HttpClient,
    public elRef:ElementRef,
    private tableService: TableService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {

  }

  ngOnInit() {
    this.component = this.tableService.getComponent();
  }

  onTextChanged(event){
    if(event.target.id == 'table_name'){
      this.table_name = event.target.value.toString();
      this.tableService.setName(this.table_name);
    }
    if(event.target.id == 'category'){
      this.category = event.target.value.toString();
      this.tableService.setCategory(this.category);
    }
  }

  addColumn(){
    this.tableService.setCount(this.counter);
    this.columnContainer.createComponent(this.colList);
    this.tableService.addIndexColArr();
    this.counter += 1;
  }

  addFileField(){
    this.tableService.setFileCount(this.fileCounter);
    this.fileContainer.createComponent(this.fileList);
    this.tableService.addIndexFileArr();
    this.fileCounter += 1;
  }

  createTable() {
    this.checkCategory();
    this.container.createComponent(this.tableList); 
    let temp = this.tableService.getTableCtr();
    this.tableService.setTableCtr(temp+1);
  }


  // Maybe in the future add the following customers/categories.
  // <option value="verizons">Verizon</option>
  // <option value="at_ts">AT&T</option>
  //  else if(this.category == "verizons"){
  //   this.container = temp[2];
  // } else if(this.category == "at_ts"){
  //   this.container = temp[3];
  // }
  checkCategory(){
    let temp: any;
    temp = this.tableService.getContainer();
    if(this.category == "tmobiles"){
      this.container = temp[0];
    } else if(this.category == "dishs"){
      this.container = temp[1];
    } else if(this.category == "starlinks"){
      this.container = temp[3];
    } else if(this.category == "references"){
      this.container = temp[4];
    } else if(this.category == "extras"){
      this.container = temp[5];
    }
    console.log(this.container);
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

}

@Component({
    template: `
    <div>
        <form (change)="onTextChanged($event)" class="tables">
          <p class="no_marg"><label for="table_name" style="margin: 0 150px 0 0;">Column #{{amount_of_col}}:</label></p>
          <textarea class="name" id="table_name{{amount_of_col}}" 
          name="siteViewForm"></textarea>
          <select id="data_type{{amount_of_col}}" class="selector" required>
            <option>Select...</option>
            <option value="text">Text</option>
            <option value="notes">Notes</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </form>
    </div>
    `,
    styleUrls: ['createTable.component.scss'], 
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ColumnComponent {

    column_name: string;
    column_type: string;
    amount_of_col: number;

    constructor(private tableService: TableService,) { 
        this.amount_of_col = this.tableService.getCount();
        console.log(this.amount_of_col);
    }

    ngOnInit() {

    }

    onTextChanged(event){
      if(event.target.id == 'table_name' + this.amount_of_col){
        this.column_name = event.target.value;
        this.tableService.setColArr(this.column_name, this.amount_of_col);
      }
      if(event.target.id == 'data_type' + this.amount_of_col){
        this.column_type = event.target.value;
        this.tableService.setColType(this.column_type, this.amount_of_col);
      }
    }

}


@Component({
  template: `
  <div>
      <form (change)="onTextChanged($event)" class="tables">
        <p class="no_marg"><label for="file_name" style="margin: 0 150px 0 0;">File #{{amount_of_files}}:</label></p>
        <textarea class="name" id="file_name{{amount_of_files}}" 
        name="siteViewForm"></textarea>
        <select id="file_type{{amount_of_files}}" class="selector" required>
          <option value="single">Single</option>
          <option value="multiple">Multiple</option>
        </select>
      </form>
  </div>
  `,
  styleUrls: ['createTable.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FileFieldComponent {

  file_name: string;
  file_type: string;
  amount_of_files: number;

  constructor(private tableService: TableService,) { 
      this.amount_of_files = this.tableService.getFileCount();
      console.log(this.amount_of_files);
  }

  ngOnInit() {

  }

  onTextChanged(event){
    if(event.target.id == 'file_name' + this.amount_of_files){
      this.file_name = event.target.value;
      this.tableService.setColArr(this.file_name, this.amount_of_files);
    }
    if(event.target.id == 'file_type' + this.amount_of_files){
      this.file_type = event.target.value;
      this.tableService.setColType(this.file_type, this.amount_of_files);
    }
  }

}