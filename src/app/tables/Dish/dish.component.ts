import { Component, Inject, LOCALE_ID } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { DishNBService } from "./dish-nb.service";
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { DOCUMENT, formatDate } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { ButtonRendererComponent } from 'src/app/site-popup/DishNB/DIshNBbuttonRender.component';
import { DateTimeRenderer } from 'src/app/table_assets/dateManagement/DateTimeFormatter';
import { MultipleFilter } from 'src/app/table_assets/filter/multipleFilter.component';
import { FilterDateComponent } from 'src/app/table_assets/filter/FilterDate.component.ts';
import { CellDateComponent } from 'src/app/table_assets/dateManagement/CellDate.component';
import * as moment from 'moment';
import { ColDef, ColGroupDef, SideBarDef } from 'ag-grid-community';
import { ViewService } from 'src/app/services/view.service';
@Component({
  selector: 'app-dish',
  templateUrl: 'dish.component.html',
})
export class DishComponent extends AppComponent {
  
  constructor(
    public viewService: ViewService,
    public dishNBService: DishNBService,
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
      headerName: 'Dish NB Site\'s',
      children: [
        {
          headerName: 'Site ID',
          field: 'site_id',
          enableRowGroup: true,
          minWidth: 150,
          filter: 'multiFilter',
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              this.dishNBService.getValues(field).subscribe(values => params.success(values));
            }
          },
          cellClassRules: normCellClassRules,
          cellRenderer: 'buttonRenderer',
        },
        {
          field: 'address',
          enableRowGroup: true,
          filter: 'agSetColumnFilter',
          minWidth: 175,
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              console.log(params);
              this.dishNBService.getValues(field).subscribe(values => params.success(values));
            }
          },
          cellClassRules: normCellClassRules
        },
        {
          field: 'city',
          enableRowGroup: true,
          filter: 'agSetColumnFilter',
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              this.dishNBService.getValues(field).subscribe(values => params.success(values));
            }
          },
          cellClassRules: normCellClassRules
        },
        { 
          field: 'state', 
          enableRowGroup: true,
          cellClassRules: normCellClassRules 
        },
        { 
          field: 'zip',
          cellClassRules: normCellClassRules 
        },
        { 
          field: 'county',
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'LAT',
          field: 'latitude', 
          enableRowGroup: true,
          cellClassRules: normCellClassRules,
          valueFormatter: (data) => {
            if(data.value){
              return Number(data.value).toFixed(6);
            } else {
              return null;
            }
          },
        },
        { 
          headerName: 'LONG',
          field: 'longitude',
          cellClassRules: normCellClassRules,
          valueFormatter: (data) => {
            if(data.value){
              return Number(data.value).toFixed(6);
            } else {
              return null;
            }
          },
        },
        { 
          headerName: 'Structure Type',
          minWidth: 150,
          field: 'structure_type',
          cellClassRules: normCellClassRules 
        }, 
        { 
          headerName: 'Structure Height',
          minWidth: 150,
          field: 'structure_height', 
          enableRowGroup: true,
          valueFormatter: (data) => {
            if(data.value){
              return data.value + '\''
            } else {
              return null;
            }
          },
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'Site ACQ',
          field: 'site_acq',
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'CM', 
          field: 'cm',
          cellClassRules: normCellClassRules 
        }, 
        { 
          headerName: 'AE', 
          field: 'ae', 
          enableRowGroup: true,
          cellClassRules: normCellClassRules,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: this.dropDown("ae"),
          },

        },
        { 
          headerName: 'Dish Priority List',
          field: 'dish_prio_list',
          minWidth: 150,
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'Site Notes',
          field: 'site_notes',
          minWidth: 200,
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'Site ACQ Notes',
          field: 'site_acq_notes',
          minWidth: 200,
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'Design Notes',
          field: 'design_notes', 
          minWidth: 200,
          enableRowGroup: true,
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'Action Owner',
          field: 'action_owner',
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'FDNY',
          field: 'fdny',
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'LPC', 
          field: 'lpc', 
          enableRowGroup: true,
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'DOB 440SQFT',
          field: 'dob_440sqft',
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'Other Carrier Present',
          field: 'other_carrier_present',
          cellClassRules: normCellClassRules 
        }, 
        { 
          headerName: 'Revisit Complete',
          field: 'revisit_complete', 
          enableRowGroup: true,
          valueFormatter: (data) => {
            if (data.value) {
              return formatDate(data.value, 'MM/dd/yyyy', locale);
            }
            return null;
          },
          filter: 'agSetColumnFilter',
          filterParams: {
            values: params => {
              const field = params.colDef.field;
              this.dishNBService.getValues(field).subscribe(values => params.success(values));
            }
          },
        cellClassRules: ragCellClassRules,
        },
        { 
          headerName: 'TPPN Received AE',
          field: 'tppn_received_ae',
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'Submeter',
          field: 'submeter',
          cellClassRules: normCellClassRules 
        },
      ]
    },
    {
      headerName: 'DESIGN',
      children: [
        { 
          headerName: 'Full SOW Matrix to Customer', 
          field: 'full_sow_matrix', 
          minWidth: 175,
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
          headerName: 'PO Received',
          field: 'po_received',
          minWidth: 150,
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'DV Ready to be Scheduled',
          field: 'dv_ready',
          minWidth: 150,
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
          headerName: 'PO Issued to AE',
          field: 'po_issued_ae', 
          minWidth: 150,
          enableRowGroup: true,
          cellClassRules: normCellClassRules 
        },
        { 
          headerName: 'DV Target',
          field: 'dv_target',
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
          headerName: 'DV Completed',
          field: 'dv_completed',
          minWidth: 150,
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
          headerName: 'DV Summary', 
          field: 'dv_summary', 
          minWidth: 150,
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
          headerName: 'Title Request',
          field: 'title_request',
          minWidth: 150,
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
          headerName: '2C Ordered',
          field: '_2c_ordered',
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
          headerName: '2C Received', 
          field: '_2c_received', 
          minWidth: 150,
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
          headerName: '2C Reviewed',
          field: '_2c_reviewed',
          minWidth: 150,
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
          headerName: '2C Uploaded',
          field: '_2c_uploaded',
          minWidth: 150,
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
      ]
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
      minWidth: 200,
      field: 'country',
      filter: 'agSetColumnFilter',
      filterParams: {
        values: params => {
          const field = params.colDef.field;
          this.dishNBService.getValues(field).subscribe(values => params.success(values));
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

  public tableName: string = "dishNB";

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
      site_id:         '',
      address:         '',
      city:            '',
      state:           '',
      zip:             '',
      county:          '',
      complete_date_p: '',
      complete_date_a: '',
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
    this.http.post(`${API_URL}dishNB-delete`, selectedRowData).subscribe(
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
    this.http.post(`${API_URL}dishNB-import`, formData).subscribe(
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
    this.http.post(`${API_URL}dishNB-update`, this.tableData).subscribe(
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
    this.http.post(`${API_URL}dishNB-dropDown`, this.columnReq).subscribe(
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
  let id                   = eventData.id      ;
  let site_id              = eventData.site_id              ;
  let address              = eventData.address              ;
  let city                 = eventData.city                 ;
  let state                = eventData.state                ;
  let zip                  = eventData.zip                  ;
  let county               = eventData.county               ;
  let latitude             = eventData.latitude             ;
  let longitude            = eventData.longitude            ;
  let structure_type       = eventData.structure_type       ;
  let structure_height     = eventData.structure_height     ;
  let site_acq             = eventData.site_acq             ;
  let cm                   = eventData.cm                   ;
  let ae                   = eventData.ae                   ;
  let dish_prio_list       = eventData.dish_prio_list       ;
  let site_notes           = eventData.site_notes           ;
  let site_acq_notes       = eventData.site_acq_notes       ;
  let design_notes         = eventData.design_notes         ;
  let action_owner         = eventData.action_owner         ;
  let fdny                 = eventData.fdny                 ;
  let lpc                  = eventData.lpc                  ;
  let dob_440sqft          = eventData.dob_440sqft          ;
  let other_carrier_present= eventData.other_carrier_present;
  let tppn_received_ae     = eventData.tppn_received_ae     ;
  let submeter             = eventData.submeter             ;
  let po_received          = eventData.po_received          ;
  let po_issued_ae         = eventData.po_issued_ae         ;
  let full_sow_matrix      ;
  let dv_ready             ;
  let revisit_complete     ;
  let dv_target            ;
  let dv_completed         ;
  let dv_summary           ;
  let title_request        ;
  let _2c_ordered          ;
  let _2c_received         ;
  let _2c_reviewed         ;
  let _2c_uploaded         ;
  if (eventData.revisit_complete) {
    revisit_complete = datetime.formatTheDate(eventData.revisit_complete);
  } else {
    revisit_complete = null;
  }
  if (eventData.full_sow_matrix) {
    full_sow_matrix = datetime.formatTheDate(eventData.full_sow_matrix);
  } else {
    full_sow_matrix = null;
  }
  if (eventData.dv_ready) {
    dv_ready = datetime.formatTheDate(eventData.dv_ready);
  } else {
    dv_ready = null;
  }
  if (eventData.dv_target) {
    dv_target = datetime.formatTheDate(eventData.dv_target);
  } else {
    dv_target = null;
  }
  if (eventData.dv_completed) {
    dv_completed = datetime.formatTheDate(eventData.dv_completed);
  } else {
    dv_completed = null;
  }
  if (eventData.dv_summary) {
    dv_summary = datetime.formatTheDate(eventData.dv_summary);
  } else {
    dv_summary = null;
  }
  if (eventData.title_request) {
    title_request = datetime.formatTheDate(eventData.title_request);
  } else {
    title_request = null;
  }
  if (eventData._2c_ordered) {
    _2c_ordered = datetime.formatTheDate(eventData._2c_ordered);
  } else {
    _2c_ordered = null;
  }
  if (eventData._2c_received) {
    _2c_received = datetime.formatTheDate(eventData._2c_received);
  } else {
    _2c_received = null;
  }
  if (eventData._2c_reviewed) {
    _2c_reviewed = datetime.formatTheDate(eventData._2c_reviewed);
  } else {
    _2c_reviewed = null;
  }
  if (eventData._2c_uploaded) {
    _2c_uploaded = datetime.formatTheDate(eventData._2c_uploaded);
  } else {
    _2c_uploaded = null;
  }
  let rowIndex = event.rowIndex;
  return { 
    id, site_id, address, city,
    state, zip, county, rowIndex, 
    latitude, longitude, structure_type, 
    structure_height, site_acq, cm, ae, 
    dish_prio_list, site_notes, site_acq_notes, 
    design_notes, action_owner, fdny, lpc, dob_440sqft,
    other_carrier_present, tppn_received_ae, submeter,
    po_received, po_issued_ae, full_sow_matrix, 
    dv_ready, revisit_complete, dv_target, 
    dv_completed, dv_summary, title_request, 
    _2c_ordered, _2c_received, _2c_reviewed, _2c_uploaded         
  };
}

function ReplaceDataItem(oldArray, newArray) {
  const datetime = new DateTimeRenderer('en-US');
  oldArray.id                   = newArray.id                   ;
  oldArray.site_id              = newArray.site_id              ;
  oldArray.address              = newArray.address              ;
  oldArray.city                 = newArray.city                 ;
  oldArray.state                = newArray.state                ;
  oldArray.zip                  = newArray.zip                  ;
  oldArray.county               = newArray.county               ;
  oldArray.latitude             = newArray.latitude             ;
  oldArray.longitude            = newArray.longitude            ;
  oldArray.structure_type       = newArray.structure_type       ;
  oldArray.structure_height     = newArray.structure_height     ;
  oldArray.site_acq             = newArray.site_acq             ;
  oldArray.cm                   = newArray.cm                   ;
  oldArray.ae                   = newArray.ae                   ;
  oldArray.dish_prio_list       = newArray.dish_prio_list       ;
  oldArray.site_notes           = newArray.site_notes           ;
  oldArray.site_acq_notes       = newArray.site_acq_notes       ;
  oldArray.design_notes         = newArray.design_notes         ;
  oldArray.action_owner         = newArray.action_owner         ;
  oldArray.fdny                 = newArray.fdny                 ;
  oldArray.lpc                  = newArray.lpc                  ;
  oldArray.dob_440sqft          = newArray.dob_440sqft          ;
  oldArray.other_carrier_present= newArray.other_carrier_present;
  oldArray.tppn_received_ae     = newArray.tppn_received_ae     ;
  oldArray.submeter             = newArray.submeter             ;
  oldArray.po_received          = newArray.po_received          ;
  oldArray.po_issued_ae         = newArray.po_issued_ae         ;
  oldArray.full_sow_matrix      = newArray.full_sow_matrix      ;
  oldArray.dv_ready             = newArray.dv_ready             ;
  oldArray.revisit_complete     = newArray.revisit_complete     ;
  oldArray.dv_target            = newArray.dv_target            ;
  oldArray.dv_completed         = newArray.dv_completed         ;
  oldArray.dv_summary           = newArray.dv_summary           ;
  oldArray.title_request        = newArray.title_request        ;
  oldArray._2c_ordered          = newArray._2c_ordered          ;
  oldArray._2c_received         = newArray._2c_received         ;
  oldArray._2c_reviewed         = newArray._2c_reviewed         ;
  oldArray._2c_uploaded         = newArray._2c_uploaded         ;
  if (newArray.revisit_complete) {
    oldArray.revisit_complete = datetime.formatTheDate(newArray.revisit_complete);
  } else {
    oldArray.revisit_complete = null;
  }
  if (newArray.full_sow_matrix) {
    oldArray.full_sow_matrix = datetime.formatTheDate(newArray.full_sow_matrix);
  } else {
    oldArray.full_sow_matrix = null;
  }
  if (newArray.dv_ready) {
    oldArray.dv_ready = datetime.formatTheDate(newArray.dv_ready);
  } else {
    oldArray.dv_ready = null;
  }
  if (newArray.dv_target) {
    oldArray.dv_target = datetime.formatTheDate(newArray.dv_target);
  } else {
    oldArray.dv_target = null;
  }
  if (newArray.dv_completed) {
    oldArray.dv_completed = datetime.formatTheDate(newArray.dv_completed);
  } else {
    oldArray.dv_completed = null;
  }
  if (newArray.dv_summary) {
    oldArray.dv_summary = datetime.formatTheDate(newArray.dv_summary);
  } else {
    oldArray.dv_summary = null;
  }
  if (newArray.title_request) {
    oldArray.title_request = datetime.formatTheDate(newArray.title_request);
  } else {
    oldArray.title_request = null;
  }
  if (newArray._2c_ordered) {
    oldArray._2c_ordered = datetime.formatTheDate(newArray._2c_ordered);
  } else {
    oldArray._2c_ordered = null;
  }
  if (newArray._2c_received) {
    oldArray._2c_received = datetime.formatTheDate(newArray._2c_received);
  } else {
    oldArray._2c_received = null;
  }
  if (newArray._2c_reviewed) {
    oldArray._2c_reviewed = datetime.formatTheDate(newArray._2c_reviewed);
  } else {
    oldArray._2c_reviewed = null;
  }
  if (newArray._2c_uploaded) {
    oldArray._2c_uploaded = datetime.formatTheDate(newArray._2c_uploaded);
  } else {
    oldArray._2c_uploaded = null;
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