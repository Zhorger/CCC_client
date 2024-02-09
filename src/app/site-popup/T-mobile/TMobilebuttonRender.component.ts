import { Component, LOCALE_ID, Inject, } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { TMobilePopUpComponentClose } from './TMobilepopup.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-button-renderer',
    templateUrl: 'TMobilebuttonRender.component.html',
})

export class ButtonRendererComponent implements ICellRendererAngularComp { //extends AppComponent

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
  _2c_fileName            : string;
  _1a_fileName            : string;

  constructor(
    public dialog: MatDialog,     
    public http: HttpClient,
    @Inject(DOCUMENT) public _document: Document,
    @Inject(LOCALE_ID) public locale: string
  ) {
    
  }

  agInit(params): void {
    this.params = params;
    this.id                     = this.params.data.id                    || null;
    this.site_id                = this.params.value                      || null;
    this.address                = this.params.data.address               || null;
    this.city                   = this.params.data.city                  || null;
    this.state                  = this.params.data.state                 || null;
    this.zip                    = this.params.data.zip                   || null;
    this.county                 = this.params.data.county                || null;
    this.complete_date_p        = this.params.data.complete_date_p       || null;
    this.complete_date_a        = this.params.data.complete_date_a       || null;
    this._2c_fileName           = this.params.data._2c_fileName          || null;
    this._1a_fileName           = this.params.data._1a_fileName          || null;
  }

  // ngOnInit() { 
  //   this.gridApi = this.params;
  // }

  refresh(params?: any): boolean {
    return true;
  }
  
  openDialog() {
    console.log('Dialog OPEN!');
    const dialogRef = this.dialog.open(TMobilePopUpComponentClose,  {
      disableClose: true,
      data: {
        id                    :this.id,
        site_id               :this.site_id               , 
        address               :this.address               ,
        city                  :this.city                  ,
        state                 :this.state                 ,
        zip                   :this.zip                   ,
        county                :this.county                ,
        complete_date_p       :this.complete_date_p       ,
        complete_date_a       :this.complete_date_a       ,
        _2c_fileName          :this._2c_fileName          ,
        _1a_fileName          :this._1a_fileName          ,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._2c_fileName     = result[0];
        this._1a_fileName     = result[1];
        this.site_id          = result[2];
        this.address          = result[3];
        this.city             = result[4];
        this.state            = result[5];
        this.zip              = result[6];
        this.county           = result[7];
        this.complete_date_p  = result[8];
        this.complete_date_a  = result[9];
      }
      console.log('The dialog was closed');
      console.log(this.params);

      const app = this.params.context.componentParent;
      const newData = {
        id                    :this.id,
        site_id               :this.site_id               , 
        address               :this.address               ,
        city                  :this.city                  ,
        state                 :this.state                 ,
        zip                   :this.zip                   ,
        county                :this.county                ,
        complete_date_p       :this.complete_date_p       ,
        complete_date_a       :this.complete_date_a       ,
        _2c_fileName          :this._2c_fileName          ,
        _1a_fileName          :this._1a_fileName          ,
        rowIndex              :this.params.rowIndex,
      };
      app.refreshCells(this.params.rowIndex, newData);
    });
  }
}