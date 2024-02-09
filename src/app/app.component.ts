import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OlympicWinnersService } from './olympic-winners.service';
import { API_URL } from './consts';
import { DOCUMENT } from '@angular/common';
import { DateTimeRenderer } from './table_assets/dateManagement/DateTimeFormatter';
import { ColDef, ColGroupDef, GridApi, ColumnApi } from 'ag-grid-community';
import { Router } from '@angular/router';
import { ViewService } from './services/view.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public gridApi;
  public gridColumnApi!: ColumnApi;
  public gridOptions;
  public autoGroupColumnDef;
  public columnDefs : (ColDef | ColGroupDef)[];
  public enableFillHandle;
  public enableRangeSelection;
  public suppressLastEmptyLineOnPaste;
  public suppressCopyRowsToClipboard;
  public frameworkComponents;
  public rowStyle; public getRowStyle; 
  public rowModelType; public rowSelection;
  public serverSideStoreType;
  public sideBar;
  public undoRedoCellEditing;
  public undoRedoCellEditingLimit;
  public context;
  public router: Router;

  constructor(
    public viewService: ViewService,
    public http: HttpClient,
    @Inject(DOCUMENT) public _document: Document,
    @Inject(LOCALE_ID) public locale: string,
  ){ 
    this.context = {
      componentParent: this
    }
  }

  public changedData: Array<{
    id: number, site_id: string, address: string, city: string,
    state: string, zip: string, county: string, rowIndex: number
  }> = new Array();
  public originData: Array<{
    oldValue: string, rowIndex: number, colId: string,
  }> = new Array();
  public createdId: number = 0;
  public cellId: Array <{rowIndex: number, colId: string}> = new Array();
  public searchText: any;
  currentFile: String;
  currentUser: String;
  public numbers = new Array('zip, latitude, longitude, structure_height, customer_po, line_item, service_amount');
  public tableName: string;
  public serviceName: object;

  ngOnInit(): void {}

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setSuppressClipboardPaste(false); 
    let table = this.viewService.getTableService();
    console.log(table);
    this.viewService.setGrid(this.gridColumnApi);
    const datasource = {
      getRows: params => {
        console.log('[Datasource] - rows requested by grid: ');
        table[1]["get" + table[0]](JSON.stringify({ ...params.request })).subscribe(response => params.success({
          rowData: response.rows,
        }))
      }
    }
    // setting the datasource, the grid will call getRows to pass the request
    params.api.setServerSideDatasource(datasource);
  }

  onCellValueChanged(event) {
    var tempRowArr;
    var tempOrigRowArr;
    var tempCellArr;
    console.log(event);
    // Date-columns was triggering this function when no change was made,
    // Drag-paste/"Fill Handle" was triggering this when no change was made, this is the failsafe.
    if((event.oldValue === null && event.value === undefined) || (event.oldValue === event.value)){
      return this.updateRows(event.rowIndex);
    }
    if(this.cellIdExist(this.cellId, event)){ // Adding to cellId Arr for highlights
      tempCellArr = this.cellIdItem(event);
      this.cellId.push(tempCellArr);
      event.data.cellId = this.cellId;
      this.gridApi.refreshCells();
    }
    if(this.uniqueOrigin(this.originData, event)){ // Removing cell highlights for undo
      tempOrigRowArr = this.originDataItem(event);
      console.log(tempOrigRowArr);
      this.originData.push(tempOrigRowArr);
      event.data.originData = this.originData;
      this.gridApi.refreshCells();
    }
    if (this.changedData.length) { // Tracking changes made, no repeat rows -> replaces
      for (let i = 0; i <= (this.changedData.length - 1); i++) {
        if ((event.rowIndex === this.changedData[i].rowIndex) && (i <= (this.changedData.length - 1))) {
          ReplaceDataItem(this.changedData[i], event.data); //event.data.changedData = this.changedData;
          return this.updateRows(event.rowIndex);
        } 
      }
    }
    tempRowArr = addDataItem(event.data, event);
    this.changedData.push(tempRowArr); //event.data.changedData = this.changedData;
    return this.updateRows(event.rowIndex);
  }

  cellEditingStopped(event){
    for(let i = 0; i < this.numbers.length; i++){
      if(this.numbers[i].indexOf(event.column.colId) > -1){
        if(!(event.value == parseInt(event.value, 10))){
          this.gridApi.forEachNode(rowNode => {
            if(event.data.id == rowNode.data.id){
              const updated = event.data;
              updated[event.column.colId] = "";
              rowNode.updateData(updated);
            }
          });
          alert(event.column.colId + ": this column only accepts numbers.");}
      } 
    }
  }
  
  getAllData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;  
  }

  updateRows(rowIndex: number) {
    this.gridApi.redrawRows({rowNode: rowIndex});
  }

  // Pretty sure I need to replace current table params with pop-up
  refreshCells(rowIndex: number, newData) {
    this.gridApi.forEachNode((node) => {
      if(node.rowIndex === rowIndex){
        node.data = newData;
      }
    });
    this.gridApi.refreshCells({rowNode: rowIndex});
  }

  //Below is for file import -- If file size requirement changes look into php.ini
  file:File = null;

  onFileSelected(event) {
    this.file = <File>event.target.files[0];
    this.currentFile = this.file.name;
  }

  undo() {
    this.gridApi.undoCellEditing();
  }

  redo() {
    this.gridApi.redoCellEditing();
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

  originDataItem(event){
    const datetime = new DateTimeRenderer('en-US');
    var oldValue = event.oldValue;
    var rowIndex = event.rowIndex;
    var colId = event.colDef.field;
    return { 
      oldValue, rowIndex, colId,
    };
  }

  uniqueOrigin(orginal, event){
    if(event.data.originData){
      if(orginal.find(x => x.rowIndex === event.rowIndex && x.colId === event.column.colId)) {
        return false;
      }
    } 
    return true;
  }

  cellIdItem(event) {
    var rowIndex = event.rowIndex;
    var colId = event.column.colId;
    return {rowIndex, colId};
  }

  cellIdExist(cellArr, event) {
    if(event.data.cellId){
      if(cellArr.find(x => x.rowIndex === event.rowIndex && x.colId === event.column.colId)) {
        return false;
      }
    } 
    return true;
  }

  onKeyDown($event){
    var focus = this.gridApi.getFocusedCell();
    this.gridApi.setFocusedCell(focus.rowIndex, focus.column.colId);
  }

}

//functions used for add, remove and update
function addDataItem(eventData, event) {
  const datetime = new DateTimeRenderer('en-US');
  var id        = eventData.id;
  var site_id   = eventData.site_id;
  var address   = eventData.address;
  var city      = eventData.city;
  var state     = eventData.state;
  var zip       = eventData.zip;
  var county    = eventData.county;
  var complete_date_p;
  var complete_date_a;
  if(eventData.complete_date_p){
    complete_date_p = datetime.formatTheDate(eventData.complete_date_p);
  } else {
    complete_date_p = null;
  }
  if(eventData.complete_date_a){
    complete_date_a = datetime.formatTheDate(eventData.complete_date_a);
  } else {
    complete_date_a = null;
  }
  var rowIndex = event.rowIndex;
  return { 
    id, site_id, address, city,
    state, zip, county, rowIndex, 
    complete_date_p, complete_date_a,
  };
}

function ReplaceDataItem(oldArray, newArray) {
  const datetime = new DateTimeRenderer('en-US');
  oldArray.id       = newArray.id;
  oldArray.site_id  = newArray.site_id;
  oldArray.address  = newArray.address;
  oldArray.city     = newArray.city;
  oldArray.state    = newArray.state;
  oldArray.zip      = newArray.zip;
  oldArray.county   = newArray.county;
  oldArray.zip      = newArray.zip;
  oldArray.county   = newArray.county;
  if(newArray.complete_date_p){
    oldArray.complete_date_p  = datetime.formatTheDate(newArray.complete_date_p);
  } else {
    oldArray.complete_date_p = null;
  }
  if(newArray.complete_date_a){
    oldArray.complete_date_a = datetime.formatTheDate(newArray.complete_date_a);
  } else {
    oldArray.complete_date_a = null;
  }
  return {oldArray};
}
