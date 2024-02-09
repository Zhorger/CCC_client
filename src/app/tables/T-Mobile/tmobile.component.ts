import { Component, Inject, LOCALE_ID } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { OlympicWinnersService } from "../../olympic-winners.service";
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { DOCUMENT, formatDate } from '@angular/common';
import { AppComponent } from '../../app.component';
import { ButtonRendererComponent } from '../../site-popup/T-mobile/TMobilebuttonRender.component';
import { MultipleFilter } from '../../table_assets/filter/multipleFilter.component';
import { FilterDateComponent } from '../../table_assets/filter/FilterDate.component.ts';
import { CellDateComponent } from '../../table_assets/dateManagement/CellDate.component';
import * as moment from 'moment';
import { ViewService } from 'src/app/services/view.service';
import { GridApi, RefreshCellsParams, SideBarDef,} from 'ag-grid-community';
@Component({
  selector: 'app-tmobile',
  templateUrl: 'tmobile.component.html',
})
export class TMobileComponent extends AppComponent {

  public components;
  public user;
  grid: GridApi;
  
  constructor(
    public olympicWinnersService: OlympicWinnersService,
    public viewService: ViewService,
    public http: HttpClient,
    @Inject(DOCUMENT) public _document: Document,
    @Inject(LOCALE_ID) public locale: string
  ){
    super(  
      viewService,
      http, 
      _document,
      locale,
    );
    
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      multiFilter: MultipleFilter,
      agDateInput: FilterDateComponent,
      agCellDateInput: CellDateComponent,
    }
    this.columnDefs = [
    {
      headerName: 'T-Mobile Basic\'s',
      children: [
        {
          headerName: 'Site ID',
          field: 'site_id',
          enableRowGroup: true,
          filter: 'multiFilter',  //'multiFilter'
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              console.log(params);
              this.olympicWinnersService.getValues(field).subscribe(values => params.success(values));
            }
          },
          cellClassRules: ragCellClassRules,
          cellRenderer: 'buttonRenderer',
        },
        {
          field: 'address',
          enableRowGroup: true,
          filter: 'agSetColumnFilter',
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              this.olympicWinnersService.getValues(field).subscribe(values => params.success(values));
            }
          },
          cellClassRules: ragCellClassRules
        },
        {
          field: 'city',
          enableRowGroup: true,
          filter: 'agSetColumnFilter',
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              this.olympicWinnersService.getValues(field).subscribe(values => params.success(values));
            }
          },
          cellClassRules: ragCellClassRules
        },
        { 
          field: 'state', 
          minWidth: 100,
          enableRowGroup: true,
          cellClassRules: ragCellClassRules 
        },
        { 
          field: 'zip',
          minWidth: 100,
          sortable: true, 
          cellClassRules: ragCellClassRules 
        },
        { field: 'county',
          minWidth: 100,
          cellClassRules: ragCellClassRules 
        },
      ]
    },
    {
      headerName: 'Date\'s',
      children: [{
        headerName: 'Projected Date',
        field: 'complete_date_p',
        minWidth: 160,
        enableRowGroup: true,
        valueFormatter: (data) => {
          if (data.value) {
            return formatDate(data.value, 'MM/dd/yyyy', locale);
          }
          return null;
        },
        filter: 'agDateColumnFilter',
        filterParams: filterParams,
        floatingFilterComponentParams: {
          suppressFilterButton: true,
        },
        cellClassRules: ragCellClassRules,
        cellEditor: 'agCellDateInput',
        editable: true,
      },
      {
        headerName: 'Complete Date',
        field: 'complete_date_a',
        minWidth: 160,
        enableRowGroup: true,
        valueFormatter: (data) => {
          if (data.value) {
            return formatDate(data.value, 'MM/dd/yyyy', locale);
          }
          return null;
        },
        filter: 'agDateColumnFilter',
        filterParams: filterParams,
        floatingFilterComponentParams: {
          suppressFilterButton: true
        },
        cellClassRules: ragCellClassRules,
        cellEditor: 'agCellDateInput',
        editable: true,
      }
      ]
    },
    ];
    this.rowModelType = 'serverSide';
    this.rowSelection = 'multiple';
    this.serverSideStoreType = 'full';
    this.enableRangeSelection = true;
    this.enableFillHandle = true;
    this.suppressLastEmptyLineOnPaste = false;
    this.suppressCopyRowsToClipboard = true;
    this.undoRedoCellEditing = true;
    this.undoRedoCellEditingLimit = 10; //default
    this.autoGroupColumnDef = {
      headerName: 'Group',
      minWidth: 250,
      field: 'country',
      filter: 'agSetColumnFilter',
      filterParams: {
        values: params => {
          const field = params.colDef.field;
          this.olympicWinnersService.getValues(field).subscribe(values => params.success(values));
        }
      },
    }
  }

  public defaultColDef = {
    flex: 1,
    minWidth: 100,
    editable: true,
    resizable: true,
    filter: true,
    sortable: true
  };

  public tableName: string = "Dish";
  public serviceName: object = this.olympicWinnersService;
  public sideBar: SideBarDef | string | string[] | boolean | null = 'columns';

  ngOnInit(): void {}

  // onGridReady(params): void {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   this.gridApi.setSuppressClipboardPaste(false); 
  //   let table = this.viewService.getTable();
  //   this.viewService.setGrid(this.gridApi);
  //   const datasource = {
  //     getRows: params => {
  //       console.log('[Datasource] - rows requested by grid: ');
  //       table[1]["get" + table[0]](JSON.stringify({ ...params.request })).subscribe(response => params.success({
  //         rowData: response.rows,
  //       }))
  //     }
  //   }
  //   // setting the datasource, the grid will call getRows to pass the request
  //   params.api.setServerSideDatasource(datasource);
  // }

  //Adds new row to the bottom of the table 
  //    *** DOES NOT UPDATE TABLE ***
  onAdd() {
    var itemsToAdd = [];
    itemsToAdd.push({
      site_id:         '',
      address:         '',
      city:            '',
      state:           '',
      zip:             '',
      county:          '',
      complete_date_p: '',
      complete_date_a: '',
    });
    var tx = {
      add: itemsToAdd, 
    };
    this.gridApi.applyServerSideTransaction({add: [tx]}); 
  }

  onRemoveSelected() {
    var selectedRowData = this.gridApi.getSelectedRows();
    console.log(selectedRowData);
    this.http.post(`${API_URL}dish-delete`, selectedRowData).subscribe(
    (response)=> {
      alert("Deleted the Selected Rows!");
    });
    this.gridApi.applyServerSideTransaction({ remove: selectedRowData });
  }

  //import excel function. creating formData in order to format file for http request
  onImport(){
    let formData = new FormData();
    formData.append("file", this.file) 
    if(this.file){
      alert("Uploading...");
      this.http.post(`${API_URL}dish-import`, formData).subscribe(
      (response)=> {
        //
        alert("Finished");
        this.refreshPage();
      });
    }
  }

  onUpdate() {
    if (!Array.isArray(this.changedData) || !this.changedData.length) {
      alert("No changes were made");
      return;
    }
    this.http.post(`${API_URL}dish-update`, this.changedData).subscribe(
    (response)=> {
      console.log(response);
    });
    console.log("Data changed:");
    console.log(this.changedData);
    this.changedData = [];   // Clearing globals       
    this.cellId = [];        // Clearing globals 
    this.gridApi.forEachNode((node) => {
      node.data.cellId = []
    });
    this.originData = [];    // Clearing globals 
    this.gridApi.forEachNode((node) => {
      node.data.originData = []
    });
    this.gridApi.refreshCells();
  }

}

// Date cell background color check
let d = new Date();
var current = new Date(d.getFullYear(), d.getMonth(), d.getDate());
var ragCellClassRules = {
  'changed': function (params) {
    if(params.data.cellId){
      if (params.data.cellId.find(y => y.rowIndex === params.rowIndex && y.colId === params.colDef.field)){
        return true;
      }
    }
  },
  'normal': function (params) {
    if(params.data.originData){
      if (params.data.originData.find(y => y.rowIndex === params.rowIndex && y.colId === params.colDef.field && y.oldValue == params.value)){
        return true;
      }
    }
  },
  'date_done': function (params) {
    if(params.data.complete_date_a){
      if((params.data.complete_date_a && params.data.complete_date_p)
        && ((params.colDef.field === "complete_date_p") || (params.colDef.field === "complete_date_a"))){
        return true;
      }
    }
  },  
  'date_soon': function (params){
    if(params.data.complete_date_p){
      var diff = moment(params.data.complete_date_p).diff(current, 'days');
      if((diff <= 15) && (params.colDef.field === "complete_date_p")){
        return true;
      }
    }
  },
  'date_past': function (params) {
    if(params.data.complete_date_p){
      if(formatDate(params.data.complete_date_p, "yyyy-MM-dd", 'en-US') < formatDate(current, "yyyy-MM-dd", 'en-US')
      && (params.colDef.field === "complete_date_p")){
        return true;
      }
    }
  }
}

var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    var dateParts = dateAsString.split('-');
    var cellDate = new Date(
      dateParts[0],     // year
      dateParts[1] - 1, // month
      dateParts[2]      // day
    );
    let filter = new Date;
    filter.setTime(filterLocalDateAtMidnight.getTime() - Math.floor(Math.abs(filterLocalDateAtMidnight.getTimezoneOffset()*60000)));

    if (filter.getTime() === cellDate.getTime()) {
      console.log('0');
      return 0;
    }
    if (cellDate < filter) {
      console.log('-1');
      return -1;
    }
    if (cellDate > filter) {
      console.log('1');
      return 1;
    }
  },
};

