import { Component, Inject, LOCALE_ID } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { DOCUMENT } from '@angular/common';
import { AppComponent } from '../../app.component';
import { MultipleFilter } from '../../table_assets/filter/multipleFilter.component';
import { CellDateComponent } from '../../table_assets/dateManagement/CellDate.component';
import { GridApi } from 'ag-grid-community';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
})
export class UserComponent extends AppComponent {

  public components;
  public user;
  grid: GridApi;
  
  constructor(
    public viewService: ViewService,
    public userService: UserService,
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
      multiFilter: MultipleFilter,
      agCellDateInput: CellDateComponent,
    }
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        enableRowGroup: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          values: params => {
            const field = params.colDef.field;
            console.log(params);
            this.userService.getValues(field).subscribe(values => params.success(values));
          }
        },
        cellClassRules: ragCellClassRules,
        cellRenderer: 'buttonRenderer',
      },
      {
        headerName: 'Email Address',
        field: 'email',
        enableRowGroup: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          values: params => {
            const field = params.colDef.field;
            this.userService.getValues(field).subscribe(values => params.success(values));
          }
        },
        cellClassRules: ragCellClassRules
      },
    ];
    this.rowModelType = 'serverSide';
    this.rowSelection = 'multiple';
    this.serverSideStoreType = 'full';
    this.enableRangeSelection = true;
    this.enableFillHandle = true;
    this.suppressLastEmptyLineOnPaste = true;
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
          this.userService.getValues(field).subscribe(values => params.success(values));
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

  ngOnInit(): void {}

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setSuppressClipboardPaste(false); 

    const datasource = {
      getRows: params => {
        console.log('[Datasource] - rows requested by grid: ');
        this.userService.getUser(JSON.stringify({ ...params.request })).subscribe(response => params.success({
          rowData: response.rows,
        }))
      }
    }
    // setting the datasource, the grid will call getRows to pass the request
    params.api.setServerSideDatasource(datasource);
  }

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
}

