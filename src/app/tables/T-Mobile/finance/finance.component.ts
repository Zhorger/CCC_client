import { Component, Inject, LOCALE_ID } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FinanceService } from './finance.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { DOCUMENT, formatDate } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { ButtonRendererComponent } from 'src/app/site-popup/T-mobile/TMobilebuttonRender.component';
import { MultipleFilter } from 'src/app/table_assets/filter/multipleFilter.component';
import { FilterDateComponent } from 'src/app/table_assets/filter/FilterDate.component.ts';
import { CellDateComponent } from 'src/app/table_assets/dateManagement/CellDate.component';
import * as moment from 'moment';
import { DateTimeRenderer } from 'src/app/table_assets/dateManagement/DateTimeFormatter';
import { SideBarDef, ValueGetterParams,} from 'ag-grid-community';
import { ViewService } from 'src/app/services/view.service';
@Component({
  selector: 'app-tmo-finance',
  templateUrl: 'finance.component.html',
})
export class TMOFinanceComponent extends AppComponent {
    
    constructor(
      public viewService: ViewService,
      public financeService: FinanceService,
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
          headerName: 'CCC Project ID',
          field: 'cccproject_id',
          enableRowGroup: true,
          minWidth: 150,
          filter: 'multiFilter',
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              this.financeService.getValues(field).subscribe(values => params.success(values));
            }
          },
          cellClassRules: normCellClassRules,
          // cellRenderer: 'buttonRenderer',
        },
        {
          headerName: 'Customer Market',
          field: 'customer_market',
          enableRowGroup: true,
          filter: 'agSetColumnFilter',
          minWidth: 175,
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              console.log(params);
              this.financeService.getValues(field).subscribe(values => params.success(values));
            }
          },
          cellClassRules: normCellClassRules
        },
        {
          field: 'project',
          enableRowGroup: true,
          filter: 'agSetColumnFilter',
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              this.financeService.getValues(field).subscribe(values => params.success(values));
            }
          },
          cellClassRules: normCellClassRules
        },
        { 
          headerName: 'TMO PM',
          field: 'tmo_pm', 
          enableRowGroup: true,
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'Customer ID',
          field: 'customer_id',
          cellClassRules: normCellClassRules,
          filter: 'multiFilter', 
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              this.financeService.getValues(field).subscribe(values => params.success(values));
            }
          },
        },
        { 
          headerName: 'Customer Project Name',
          field: 'customer_proj_name',
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'WBS Element ID',
          field: 'wbs_element_id', 
          enableRowGroup: true,
          cellClassRules: normCellClassRules,
        },
        { 
          headerName: 'POR ID',
          field: 'por_id',
          cellClassRules: normCellClassRules,
        },
        { 
          headerName: 'Customer PO #',
          minWidth: 150,
          field: 'customer_po',
          cellClassRules: normCellClassRules, 
        }, 
        { 
          headerName: 'Customer PO Line',
          minWidth: 150,
          field: 'line_item', 
          enableRowGroup: true,
          cellClassRules: normCellClassRules, 
        },
        { 
          headerName: 'PO Line Description',
          field: 'po_line_desc',
          cellClassRules: normCellClassRules, 
        },
        { 
          headerName: 'Service Amount', 
          field: 'service_amount',
          cellClassRules: normCellClassRules,
          valueFormatter: (data) => {
            if (data.value) {
              return '$' + Number(data.value).toFixed(2);
            }
            return "$0.00" ;
          },
        }, 
        { 
          headerName: 'POR Submitted', 
          field: 'por_submitted', 
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
          cellEditor: 'agCellDateInput',
          cellClassRules: ragCellClassRules, 
        },
        { 
          headerName: 'PO received',
          field: 'po_received',
          minWidth: 150,
          valueFormatter: (data) => {
            if (data.value == "No") {
              return "No";
            } else if (data.value) {
              return formatDate(data.value, 'MM/dd/yyyy', locale);
            } else {
              return "No";
            }
          },
          filter: 'agDateColumnFilter',
          filterParams: filterParams,
          floatingFilterComponentParams: {
            suppressFilterButton: true,
          },
          cellEditor: 'agCellDateInput',
          cellClassRules: ragCellClassRules, 
        },
        {
          headerName: 'Amount Received',
          field: 'amount_received',
          minWidth: 200,
          cellClassRules: normCellClassRules,
          valueGetter: amountGetter, 
        },
        { 
          headerName: 'Received Request Date',
          field: 'received_req_date',
          minWidth: 200,
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
          cellEditor: 'agCellDateInput',
          cellClassRules: ragCellClassRules, 
        },
        { 
          headerName: 'TMO Submitted for Approval',
          field: 'tmo_submit_approv',
          minWidth: 200,
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
          cellEditor: 'agCellDateInput',
          cellClassRules: ragCellClassRules,
        },
        { 
          headerName: 'Receive Confirmation',
          field: 'receive_confirm', 
          minWidth: 200,
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
          cellEditor: 'agCellDateInput',
          cellClassRules: ragCellClassRules, 
        },
        { 
          headerName: 'Receive Amount',
          field: 'receive_amount',
          cellClassRules: normCellClassRules,
          valueFormatter: (data) => {
            if (data.value) {
              return '$' + Number(data.value).toFixed(2);
            }
            return "$0.00" ;
          },
        },
        { 
          headerName: '2nd Received Request Date',
          field: '_2_received_req_date',
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
          cellEditor: 'agCellDateInput',
          cellClassRules: ragCellClassRules,
        },
        { 
          headerName: '2nd Received Confirmation', 
          field: '_2_received_confirm', 
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
          cellEditor: 'agCellDateInput',
          cellClassRules: ragCellClassRules,
        },
        { 
          headerName: '2nd Received Amount',
          field: '_2_received_amount',
          cellClassRules: normCellClassRules,
          valueFormatter: (data) => {
            if (data.value) {
              return '$' + Number(data.value).toFixed(2);
            }
            return "$0.00" ;
          },
        },
        { 
          headerName: '3rd Received Request Date',
          field: '_3_received_req_date',
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
          cellEditor: 'agCellDateInput',
          cellClassRules: ragCellClassRules,
        }, 
        { 
          headerName: '3rd Received Confirmation',
          field: '_3_received_confirm', 
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
          cellEditor: 'agCellDateInput',
          cellClassRules: ragCellClassRules,
        },
        { 
          headerName: '3rd Received Amount',
          field: '_3_received_amount',
          cellClassRules: normCellClassRules,
          valueFormatter: (data) => {
            if (data.value) {
              return '$' + Number(data.value).toFixed(2);
            }
            return "$0.00" ;
          },
        },
        { 
          headerName: 'Total Received',
          field: 'total_received',
          cellClassRules: normCellClassRules,
          valueGetter: totalGetter,
        },
        { 
          headerName: 'Amount Not Invoiced', 
          field: 'amount_not_invoiced', 
          minWidth: 175,
          enableRowGroup: true,
          valueGetter: notInvoicedGetter,
        },
        { 
          field: 'notes',
          minWidth: 150,
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'Service Code',
          field: 'service_code',
          minWidth: 150,
          enableRowGroup: true,
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
        minWidth: 200,
        field: 'country',
        filter: 'agSetColumnFilter',
        filterParams: {
          values: params => {
            const field = params.colDef.field;
            this.financeService.getValues(field).subscribe(values => params.success(values));
          }
        }
      }
      this.changedData = this.tableData;
    }
  
    public defaultColDef = {
      flex: 1,
      minWidth: 125,
      editable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      sortable: true
    };
  
    public sideBar: SideBarDef | string | string[] | boolean | null = 'columns';
  
    public columnReq: Array<{}> = new Array();
  
    public tableData: Array<{
      id: number, site_id: string, address: string, city: string,
      state: string, zip: string, county: string, latitude: number, 
      longitude: number, structure_type: string, structure_height: number,
      site_acq: string, cm: string, ae: string,
      dish_prio_list: string, site_notes: string, 
      site_acq_notes: string, design_notes: string,
      action_owner: string, fdny: string, lpc: string, 
      dob_440sqft: string, other_carrier_present: string,
      tppn_received_ae: string, submeter: string, po_received: string, 
      po_issued_ae: string, 
      rowIndex: number
    }> = new Array();

    public tableName: string = "TMOFinance";
  
    ngOnInit(): void {}
  
    
    onCellValueChanged(event) {
      let tempRowArr;
      let tempOrigRowArr;
      let tempCellArr;
      console.log(event);
      // Date-columns was triggering this function when no change was made,
      // Drag-paste/"Fill Handle" was triggering this when no change was made, this is the failsafe.
      if((event.oldValue === null && event.value === undefined) || (event.oldValue === event.value)){
        console.log("No changes were made");
        return;
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
      if (this.tableData.length) { // Tracking changes made, no repeat rows -> replaces
        for (let i = 0; i <= (this.tableData.length - 1); i++) {
          if ((event.rowIndex === this.tableData[i].rowIndex) && (i <= (this.tableData.length - 1))) {
            ReplaceDataItem(this.tableData[i], event.data); //event.data.tableData = this.tableData;
            return;
          } 
        }
      }
      console.log(event.data);
      tempRowArr = addDataItem(event.data, event);
      this.tableData.push(tempRowArr); //event.data.tableData = this.tableData;
      return;
    }
  
    
    //Adds new row to the bottom of the table 
    //    *** DOES NOT UPDATE TABLE ***
    onAdd() {
      this.createdId = this.createdId + 1;
      let itemsToAdd = [];
      itemsToAdd.push({
        cccproject_id:         '',
      });
      let tx = {
        add: itemsToAdd, 
        createdId: this.createdId,
      };
      this.gridApi.applyServerSideTransaction({add: [tx]}); 
    }
  
    onRemoveSelected() {
      let selectedRowData = this.gridApi.getSelectedRows();
      console.log(selectedRowData);
      this.http.post(`${API_URL}TMOFinance-delete`, selectedRowData).subscribe(
      (response)=> {
        console.log(response);
      });
      this.gridApi.applyServerSideTransaction({ remove: selectedRowData });
    }
  
    
    //import excel function. creating formData in order to format file for http request
    onImport(){
      let formData = new FormData();
      formData.append("file", this.file);
      alert("Uploading..."); 
      this.http.post(`${API_URL}TMOFinance-import`, formData).subscribe(
        (response)=> {
          //
          alert("Finished");
          this.refreshPage();
        });
    }
  
    onUpdate() {
      if (!Array.isArray(this.tableData) || !this.tableData.length) {
        console.log('No rows were changed!');
        return;
      }
      this.http.post(`${API_URL}TMOFinance-update`, this.tableData).subscribe(
      (response)=> {
        console.log(response);
      });
      console.log("Data changed:");
      console.log(this.tableData);
      this.tableData = [];   // Clearing globals       
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
  
    dropDown(field:string){
      let convertionArr;
      let result: Array<string> = new Array;
      this.columnReq[0] = field;
      this.http.post(`${API_URL}TMOFinance-dropDown`, this.columnReq).subscribe(
        (response) => {
          convertionArr = response;
          for(let i = 0; i != convertionArr.length; i++){
            result[i] = convertionArr[i].ae;
          }
        }
      )
      return result;
    }
  
  }
  
  //functions used for add, remove and update
  function addDataItem(eventData, event) {
    const datetime = new DateTimeRenderer('en-US');
    let id                   = eventData.id                  ;
    let cccproject_id        = eventData.cccproject_id       ;
    let customer_market      = eventData.customer_market     ;
    let project              = eventData.project             ;
    let tmo_pm               = eventData.tmo_pm              ;
    let customer_id          = eventData.customer_id         ;
    let customer_proj_name   = eventData.customer_proj_name  ;
    let wbs_element_id       = eventData.wbs_element_id      ;
    let por_id               = eventData.por_id              ;
    let customer_po          = eventData.customer_po         ;
    let line_item            = eventData.line_item           ;
    let po_line_desc         = eventData.po_line_desc        ;
    let service_amount       = eventData.service_amount      ;
    let por_submitted        ;
    let po_received          ;
    let amount_received      = eventData.amount_received     ;
    let received_req_date    ;
    let tmo_submit_approv    ;
    let receive_confirm      ;
    let receive_amount       = eventData.receive_amount      ;
    let _2_received_req_date ;
    let _2_received_confirm  ;
    let _2_received_amount   = eventData._2_received_amount  ;
    let _3_received_req_date ;
    let _3_received_confirm  ;
    let _3_received_amount   = eventData._3_received_amount  ;
    let total_received       = eventData.total_received      ;
    let amount_not_invoiced  = eventData.amount_not_invoiced ;
    let notes                = eventData.notes               ;
    let service_code         = eventData.service_code        ;
    if (eventData.por_submitted) {
      por_submitted = datetime.formatTheDate(eventData.por_submitted);
    } else {
      por_submitted = null;
    }
    if (eventData.po_received) {
      po_received = datetime.formatTheDate(eventData.po_received);
    } else {
      po_received = null;
    }
    if (eventData.received_req_date) {
      received_req_date = datetime.formatTheDate(eventData.received_req_date);
    } else {
      received_req_date = null;
    }
    if (eventData.tmo_submit_approv) {
      tmo_submit_approv = datetime.formatTheDate(eventData.tmo_submit_approv);
    } else {
      tmo_submit_approv = null;
    }
    if (eventData.receive_confirm) {
      receive_confirm = datetime.formatTheDate(eventData.receive_confirm);
    } else {
      receive_confirm = null;
    }
    if (eventData._3_received_req_date) {
      _3_received_req_date = datetime.formatTheDate(eventData._3_received_req_date);
    } else {
      _3_received_req_date = null;
    }
    if (eventData._3_received_confirm) {
      _3_received_confirm = datetime.formatTheDate(eventData._3_received_confirm);
    } else {
      _3_received_confirm = null;
    }
    let rowIndex = event.rowIndex;
    return { 
      id                  ,
      cccproject_id       ,
      customer_market     ,
      project             ,
      tmo_pm              ,
      customer_id         ,
      customer_proj_name  ,
      wbs_element_id      ,
      por_id              ,
      customer_po         ,
      line_item           ,
      po_line_desc        ,
      service_amount      ,
      por_submitted       ,
      po_received         ,
      amount_received     ,
      received_req_date   ,
      tmo_submit_approv   ,
      receive_confirm     ,
      receive_amount      ,
      _2_received_req_date,
      _2_received_confirm ,
      _2_received_amount  ,
      _3_received_req_date,
      _3_received_confirm ,
      _3_received_amount  ,
      total_received      ,
      amount_not_invoiced ,
      notes               ,
      service_code        ,   
      rowIndex   
    };
  }
  
  function ReplaceDataItem(oldArray, newArray) {
    const datetime = new DateTimeRenderer('en-US');
    oldArray.id                   = newArray.id                   ;
    oldArray.cccproject_id        = newArray.cccproject_id        ;
    oldArray.customer_market      = newArray.customer_market      ;
    oldArray.project              = newArray.project              ;
    oldArray.tmo_pm               = newArray.tmo_pm               ;
    oldArray.customer_id          = newArray.customer_id          ;
    oldArray.customer_proj_name   = newArray.customer_proj_name   ;
    oldArray.wbs_element_id       = newArray.wbs_element_id       ;
    oldArray.por_id               = newArray.por_id               ;
    oldArray.customer_po          = newArray.customer_po          ;
    oldArray.line_item            = newArray.line_item            ;
    oldArray.po_line_desc         = newArray.po_line_desc         ;
    oldArray.service_amount       = newArray.service_amount       ;
    oldArray.amount_received      = newArray.amount_received      ;
    oldArray.receive_amount       = newArray.receive_amount       ;
    oldArray._2_received_amount   = newArray._2_received_amount   ;
    oldArray._3_received_amount   = newArray._3_received_amount   ;
    oldArray.total_received       = newArray.total_received       ;
    oldArray.amount_not_invoiced  = newArray.amount_not_invoiced  ;
    oldArray.notes                = newArray.notes                ;
    oldArray.service_code         = newArray.service_code         ;
    if (newArray.por_submitted) {
      oldArray.por_submitted = datetime.formatTheDate(newArray.por_submitted);
    } else {
      oldArray.por_submitted = null;
    }
    if (newArray.po_received) {
      oldArray.po_received = datetime.formatTheDate(newArray.po_received);
    } else {
      oldArray.po_received = null;
    }
    if (newArray.received_req_date) {
      oldArray.received_req_date = datetime.formatTheDate(newArray.received_req_date);
    } else {
      oldArray.received_req_date = null;
    }
    if (newArray.tmo_submit_approv) {
      oldArray.tmo_submit_approv = datetime.formatTheDate(newArray.tmo_submit_approv);
    } else {
      oldArray.tmo_submit_approv = null;
    }
    if (newArray.receive_confirm) {
      oldArray.receive_confirm = datetime.formatTheDate(newArray.receive_confirm);
    } else {
      oldArray.receive_confirm = null;
    }
    if (newArray._2_received_req_date) {
      oldArray._2_received_req_date = datetime.formatTheDate(newArray._2_received_req_date);
    } else {
      oldArray._2_received_req_date = null;
    }
    if (newArray._2_received_confirm) {
      oldArray._2_received_confirm = datetime.formatTheDate(newArray._2_received_confirm);
    } else {
      oldArray._2_received_confirm = null;
    }
    if (newArray._3_received_req_date) {
      oldArray._3_received_req_date = datetime.formatTheDate(newArray._3_received_req_date);
    } else {
      oldArray._3_received_req_date = null;
    }
    if (newArray._3_received_confirm) {
      oldArray._3_received_confirm = datetime.formatTheDate(newArray._3_received_confirm);
    } else {
      oldArray._3_received_confirm = null;
    }
    return {oldArray};
  }
  
  
  // -- NORMAL COLUMNS --
  let normCellClassRules = {
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
  // -- DATE COLUMNS
  let d = new Date();
  let current = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  let ragCellClassRules = {
    'changed': function (params) {
      if(params.data.cellId){
        if (params.data.cellId.find(y => y.rowIndex === params.rowIndex && y.colId === params.colDef.field)){
          return true;
        }
      }
    },
    'normal': function (params) {
      if(params.data.originData){
        if (params.data.originData.find(y => y.rowIndex === params.rowIndex && y.colId === params.colDef.field && y.oldValue === params.value)){
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
        let diff = moment(params.data.complete_date_p).diff(current, 'days');
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
function amountGetter(params: ValueGetterParams){
  if(!(params.data.po_received)){
    return '$0.00';
  } else if (params.data.po_received){
    return '$' + Number(params.data.service_amount).toFixed(2);
  }
}
function totalGetter(params: ValueGetterParams){
  let total = 0.00;
  if((params.data.receive_confirm) &&
  (params.data._2_received_confirm) &&
  (params.data._3_received_confirm)){
    return '$0.00';
  } 
  // if (params.data.receive_confirm){
  //   total = total + params.data.receive_amount;
  // } 
  // if (params.data._2_received_confirm){
  //   total = total + params.data._2_received_amount;
  // } 
  // if (params.data._3_received_confirm){
  //   total = total + params.data._3_received_amount;
  // } 
  total = params.data.receive_amount + params.data._2_received_amount + params.data._3_received_amount;
  return '$' + Number(total).toFixed(2);

}
function notInvoicedGetter(params: ValueGetterParams){
  let total:Number = 0;
  if(!(params.data.receive_amount || params.data._2_received_amount || params.data._3_received_amount)){
    return '$0.00';
  } else {
  total = params.data.service_amount - params.data.receive_amount - params.data._2_received_amount - params.data._3_received_amount;
  }
  return '$' + Number(total).toFixed(2);
}
