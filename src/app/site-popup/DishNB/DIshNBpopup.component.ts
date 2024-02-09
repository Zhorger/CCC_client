import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { formatDate, DOCUMENT } from '@angular/common';
import { DateTimeRenderer } from '../../table_assets/dateManagement/DateTimeFormatter';
import { finalize } from 'rxjs/operators';
import * as saveAs  from 'file-saver';

export interface DialogData { }

@Component({
    selector: 'app-popup',
    templateUrl: 'DIshNBpopup.component.html',
    styleUrls: ['popup.component.scss'],
})
export class PopUpComponentClose {

  params;
  id                      : number;
  site_id                 : string;
  address                 : string;
  city                    : string;
  state                   : string;
  zip                     : string;
  county                  : string;
  latitude                : string;
  longitude               : string;
  structure_type          : string;
  structure_height        : string;
  site_acq                : string;
  cm                      : string;
  ae                      : string;
  dish_prio_list          : string;
  site_notes              : string;
  site_acq_notes          : string;
  design_notes            : string;
  action_owner            : string;
  fdny                    : string;
  lpc                     : string;
  dob_440sqft             : string;
  other_carrier_present   : string;
  revisit_complete        : string;
  tppn_received_ae        : string;
  submeter                : string;
  full_sow_matrix         : string;
  po_received             : string;
  dv_ready                : string;
  po_issued_ae            : string;
  dv_target               : string;
  dv_completed            : string;
  dv_summary              : string;
  title_request           : string;
  _2c_ordered             : string;
  _2c_received            : string;
  _2c_reviewed            : string;
  _2c_uploaded            : string;
  file:File = null;
  _2c = '';
  FDNY = '';
  ss_nfc = '';
  SA = '';
  CD = '';
  lease_Package = '';
  lpc_Package = '';
  uploadSub: any;
  uploadArr: Array<{id: number, file: File, elementId: string, fileName: string}> = new Array;
  textArr: Array<{id: number, field: File, value: string}> = new Array;

  ngOnInit() {
    this.id                     = this.data.id                    ; 
    this.site_id                = this.data.site_id               ; 
    this.address                = this.data.address               ; 
    this.city                   = this.data.city                  ; 
    this.state                  = this.data.state                 ; 
    this.zip                    = this.data.zip                   ; 
    this.county                 = this.data.county                ; 
    this.latitude               = this.data.latitude              ; 
    this.longitude              = this.data.longitude             ; 
    this.structure_type         = this.data.structure_type        ; 
    this.structure_height       = this.data.structure_height      ; 
    this.site_acq               = this.data.site_acq              ; 
    this.cm                     = this.data.cm                    ; 
    this.ae                     = this.data.ae                    ; 
    this.dish_prio_list         = this.data.dish_prio_list        ; 
    this.site_notes             = this.data.site_notes            ; 
    this.site_acq_notes         = this.data.site_acq_notes        ; 
    this.design_notes           = this.data.design_notes          ; 
    this.action_owner           = this.data.action_owner          ; 
    this.fdny                   = this.data.fdny                  ; 
    this.lpc                    = this.data.lpc                   ; 
    this.dob_440sqft            = this.data.dob_440sqft           ; 
    this.other_carrier_present  = this.data.other_carrier_present ; 
    this.revisit_complete       = this.data.revisit_complete      ; 
    this.tppn_received_ae       = this.data.tppn_received_ae      ; 
    this.submeter               = this.data.submeter              ; 
    this.full_sow_matrix        = this.data.full_sow_matrix       ; 
    this.po_received            = this.data.po_received           ; 
    this.dv_ready               = this.data.dv_ready              ; 
    this.po_issued_ae           = this.data.po_issued_ae          ; 
    this._2c                    = this.data._2c_fileName          ;
    this.FDNY                   = this.data.FDNY_fileName         ;
    this.ss_nfc                 = this.data.SS_NFC_fileName       ;
    this.SA                     = this.data.SA_fileName           ;
    this.CD                     = this.data.CD_fileName           ;
    this.lease_Package          = this.data.Lease_Package_fileName;
    this.lpc_Package            = this.data.LPC_Package_fileName  ;
    if (this.data.revisit_complete) {
      this.revisit_complete = formatDate(this.data.revisit_complete, "MM/dd/yyyy", 'en-US');
    } else {
      this.revisit_complete = "";
    }
    if (this.data.full_sow_matrix) {
      this.full_sow_matrix = formatDate(this.data.full_sow_matrix, "MM/dd/yyyy", 'en-US');
    } else {
      this.full_sow_matrix = "";
    }
    if (this.data.dv_ready) {
      this.dv_ready = formatDate(this.data.dv_ready, "MM/dd/yyyy", 'en-US');
    } else {
      this.dv_ready = "";
    }
    if (this.data.dv_target) {
      this.dv_target = formatDate(this.data.dv_target, "MM/dd/yyyy", 'en-US');
    } else {
      this.dv_target = "";
    }
    if (this.data.dv_completed) {
      this.dv_completed = formatDate(this.data.dv_completed, "MM/dd/yyyy", 'en-US');
    } else {
      this.dv_completed = "";
    }
    if (this.data.dv_summary) {
      this.dv_summary = formatDate(this.data.dv_summary, "MM/dd/yyyy", 'en-US');
    } else {
      this.dv_summary = "";
    }
    if (this.data.title_request) {
      this.title_request = formatDate(this.data.title_request, "MM/dd/yyyy", 'en-US');
    } else {
      this.title_request = "";
    }
    if (this.data._2c_ordered) {
      this._2c_ordered = formatDate(this.data._2c_ordered, "MM/dd/yyyy", 'en-US');
    } else {
      this._2c_ordered = "";
    }
    if (this.data._2c_received) {
      this._2c_received = formatDate(this.data._2c_received, "MM/dd/yyyy", 'en-US');
    } else {
      this._2c_received = "";
    }
    if (this.data._2c_reviewed) {
      this._2c_reviewed = formatDate(this.data._2c_reviewed, "MM/dd/yyyy", 'en-US');
    } else {
      this._2c_reviewed = "";
    }
    if (this.data._2c_uploaded) {
      this._2c_uploaded = formatDate(this.data._2c_uploaded, "MM/dd/yyyy", 'en-US');
    } else {
      this._2c_uploaded = "";
    }
  }

  constructor(
    public dialogRef: MatDialogRef<PopUpComponentClose>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) public _document: Document,
    public http: HttpClient,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    console.log(this.textArr)
    if(this.textArr){
      for(let i = 0; i != this.textArr.length; i++){
        this.http.post(`${API_URL}dish-popup_update`, this.textArr[i]).subscribe(
        (response)=> {
          this.textArr = [];
          // this.refreshPage(); <-- used to refresh values on grid.
        });
      }
    }
    if(this.uploadArr){
      for(let i = 0; i != this.uploadArr.length; i++) {
        const formData = new FormData();
        formData.append("file", this.uploadArr[i].file);
        formData.append("id", this.uploadArr[i].id.toString());
        formData.append("elementId", this.uploadArr[i].elementId);
        formData.append("fileName", this.uploadArr[i].fileName);
        const upload$ = this.http.post(`${API_URL}dish-upload`, formData, {
          reportProgress: true,
          observe: 'events'
        })
        this.uploadSub = upload$.subscribe();
      }
    }
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

  onTextChanged(event){
    console.log(event);
    console.log(event.target.id);
    console.log(event.target.value.toString());
    if(event.target.id == 'site_id'){
      this.site_id = event.target.value.toString();
    } else if(event.target.id == 'address'){
      this.address = event.target.value.toString();
    } else if(event.target.id == 'city'){
      this.city = event.target.value.toString();
    } else if(event.target.id == 'state'){
      this.state = event.target.value.toString();
    } else if(event.target.id == 'zip'){
      this.zip = event.target.value.toString();
    } else if(event.target.id == 'county'){
      this.county = event.target.value.toString();
    } 
    else if(event.target.id == 'latitude'){
      this.latitude = event.target.value.toString();
    }              
    else if(event.target.id == 'longitude'){
      this.longitude = event.target.value.toString();
    }             
    else if(event.target.id == 'structure_type'){
      this.structure_type = event.target.value.toString();
    }
    else if(event.target.id == 'structure_height'){
      this.structure_height = event.target.value.toString();
    }      
    else if(event.target.id == 'site_acq'){
      this.site_acq = event.target.value.toString();
    }              
    else if(event.target.id == 'cm'){
      this.cm = event.target.value.toString();
    }                    
    else if(event.target.id == 'ae'){
      this.ae = event.target.value.toString();
    }                    
    else if(event.target.id == 'dish_prio_list'){
      this.dish_prio_list = event.target.value.toString();
    }        
    else if(event.target.id == 'site_notes'){
      this.site_notes = event.target.value.toString();
    }            
    else if(event.target.id == 'site_acq_notes'){
      this.site_acq_notes = event.target.value.toString();
    }        
    else if(event.target.id == 'design_notes'){
      this.design_notes = event.target.value.toString();
    }          
    else if(event.target.id == 'action_owner'){
      this.action_owner = event.target.value.toString();
    }          
    else if(event.target.id == 'fdny'){
      this.fdny = event.target.value.toString();
    }                  
    else if(event.target.id == 'lpc'){
      this.lpc = event.target.value.toString();
    }                   
    else if(event.target.id == 'dob_440sqft'){
      this.dob_440sqft = event.target.value.toString();
    }           
    else if(event.target.id == 'other_carrier_present'){
      this.other_carrier_present = event.target.value.toString();
    } 
    else if(event.target.id == 'revisit_complete'){
      this.revisit_complete = event.target.value.toString();
    }      
    else if(event.target.id == 'tppn_received_ae'){
      this.tppn_received_ae = event.target.value.toString();
    }      
    else if(event.target.id == 'submeter'){
      this.submeter = event.target.value.toString();
    }              
    else if(event.target.id == 'full_sow_matrix'){
      this.full_sow_matrix = event.target.value.toString();
    }       
    else if(event.target.id == 'po_received'){
      this.po_received = event.target.value.toString();
    }           
    else if(event.target.id == 'dv_ready'){
      this.dv_ready = event.target.value.toString();
    }              
    else if(event.target.id == 'po_issued_ae'){
      this.po_issued_ae = event.target.value.toString();
    }          
    else if(event.target.id == '_2c_fileName'){
      this._2c = event.target.value.toString();
    }          
    else if(event.target.id == 'FDNY_fileName'){
      this.FDNY = event.target.value.toString();
    }         
    else if(event.target.id == 'SS_NFC_fileName'){
      this.ss_nfc = event.target.value.toString();
    }       
    else if(event.target.id == 'SA_fileName'){
      this.SA = event.target.value.toString();
    }           
    else if(event.target.id == 'CD_fileName'){
      this.CD = event.target.value.toString();
    }           
    else if(event.target.id == 'Lease_Package_fileName'){
      this.lease_Package = event.target.value.toString();
    }
    else if(event.target.id == 'LPC_Package_fileName'){
      this.lpc_Package = event.target.value.toString();
    }  
    let temp = addTextItem(event, this.id);
    this.textArr.push(temp);
  }

  //loading the filename for display
  //loading the filename for display
  onFileSelected(event) {
    this.file = <File>event.target.files[0];
    const elementId = event.target.id || event.srcElement.id || event.currentTarget.id;
    console.log(elementId);
    if(elementId == '_2c_fileName'){
      this._2c = this.file.name;
    }
    else if(elementId == 'FDNY_fileName'){
      this.FDNY = this.file.name;
    }
    else if(elementId == 'SS_NFC_fileName'){
      this.ss_nfc = this.file.name;
    }
    else if(elementId == 'SA_fileName'){
      this.SA = this.file.name;
    }
    else if(elementId == 'CD_fileName'){
      this.CD = this.file.name;
    }
    else if(elementId == 'Lease_Package_fileName'){
      this.lease_Package = this.file.name;
    }
    else if(elementId == 'LPC_Package_fileName'){
      this.lpc_Package = this.file.name;
    }
  }
    
  //dynamically allocating the file on the backend
  //file content | row ID | file column | file name
  //with progess par
  upload(event) {  
    if (this.file) {
      let elementId = event.target.id || event.srcElement.id || event.currentTarget.id;
      let temp = addFileItem(this.file, elementId, this.id);
      this.uploadArr.push(temp);
      console.log(this.uploadArr);
    }
  }

  //dynamically call file for download using Filesaver.js
  //statically download to download folder - exact file name as uploaded
  downloadFile(event) {
    let elementId = event.target.id || event.srcElement.id || event.currentTarget.id;
    let fileName = (<HTMLInputElement>this._document.getElementById(elementId)).name;
    const formData = new FormData();
    formData.append("id", this.id.toString());
    formData.append("fileName", fileName);
    const req = this.http.post(`${API_URL}dishNB-download`, formData, {responseType:'blob', observe: 'response' }).subscribe( 
        (response: any) =>{
          let blob = new Blob([response.body], {type: 'application/vnd.ms-excel;charset=utf-8'});
          saveAs(blob, fileName);
        }
    )
  }
}

function addFileItem(entireFile, elementsId, rowId) {
  var id        = rowId;
  var file      = entireFile;
  var elementId = elementsId;
  var fileName  = entireFile.name;
  return { 
    id, file, elementId, fileName,
  };
}

function addTextItem(event, rowId) {
  var id    = rowId;
  var field = event.target.id;
  var value;
  if(field == 'complete_date_p' || field == 'complete_date_a'){
    value = formatDate(event.target.value, "yyyy-MM-", 'en-US');
  } else {
    value = event.target.value;
  }
  return { 
    id, field, value,
  };
}