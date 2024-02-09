import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { formatDate, DOCUMENT } from '@angular/common';
import * as saveAs  from 'file-saver';

export interface DialogData { }

@Component({
    selector: 'app-popup',
    templateUrl: 'TMobilepopup.component.html',
    styleUrls: ['popup.component.scss'],
})
export class TMobilePopUpComponentClose {

  params;
  id                      : number;
  site_id                 : string;
  address                 : string;
  city                    : string;
  state                   : string;
  zip                     : string;
  county                  : string;
  complete_date_p         : string;
  complete_date_a         : string;
  file:File = null;
  _2c = '';
  _1a = '';
  uploadSub: any;
  uploadArr: Array<{id: number, file: File, elementId: string, fileName: string}> = new Array;
  textArr: Array<{id: number, field: File, value: string}> = new Array;

  ngOnInit() {
    this.id                     = this.data.id          ; 
    this.site_id                = this.data.site_id     ; 
    this.address                = this.data.address     ; 
    this.city                   = this.data.city        ; 
    this.state                  = this.data.state       ; 
    this.zip                    = this.data.zip         ; 
    this.county                 = this.data.county      ; 
    this._2c                    = this.data._2c_fileName;
    this._1a                    = this.data._1a_fileName;
    if (this.data.complete_date_p) {
      this.complete_date_p = formatDate(this.data.complete_date_p, "MM/dd/yyyy", 'en-US');
    } else {
      this.complete_date_p = "";
    }
    if (this.data.complete_date_a) {
      this.complete_date_a = formatDate(this.data.complete_date_a, "MM/dd/yyyy", 'en-US');
    } else {
      this.complete_date_a = "";
    }
  }

  constructor(
    public dialogRef: MatDialogRef<TMobilePopUpComponentClose>,
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
    } else if(event.target.id == 'complete_date_p'){
      this.complete_date_p = event.target.value;
    } else if(event.target.id == 'complete_date_a'){
      this.complete_date_a = event.target.value;
    } 
    let temp = addTextItem(event, this.id);
    this.textArr.push(temp);
  }

  //loading the filename for display
  onFileSelected(event) {
    this.file = <File>event.target.files[0];
    const elementId = event.target.id || event.srcElement.id || event.currentTarget.id;
    this.upload(event);
    if(elementId == '_2c_fileName'){
      this._2c = this.file.name;
    }
    else if(elementId == '_1a_fileName'){
      this._1a = this.file.name;
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
    const req = this.http.post(`${API_URL}dish-download`, formData, {responseType:'blob', observe: 'response' }).subscribe( 
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
