import { Component, LOCALE_ID, Inject} from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { PopUpComponentClose } from './DIshNBpopup.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-button-renderer',
    templateUrl: 'DIshNBbuttonRender.component.html',
  })
  
  export class ButtonRendererComponent implements ICellRendererAngularComp {
  
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
    _2c_fileName            : string;
    FDNY_fileName           : string;
    SS_NFC_fileName         : string;
    SA_fileName             : string;
    CD_fileName             : string;
    Lease_Package_fileName  : string;
    LPC_Package_fileName    : string;
  
    constructor(
      public dialog: MatDialog,     
      public http: HttpClient,
      @Inject(DOCUMENT) public _document: Document,
      @Inject(LOCALE_ID) public locale: string // <== added
    ){

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
      this.latitude               = this.params.data.latitude              || null;
      this.longitude              = this.params.data.longitude             || null;
      this.structure_type         = this.params.data.structure_type        || null;
      this.structure_height       = this.params.data.structure_height      || null;
      this.site_acq               = this.params.data.site_acq              || null;
      this.cm                     = this.params.data.cm                    || null;
      this.ae                     = this.params.data.ae                    || null;
      this.dish_prio_list         = this.params.data.dish_prio_list        || null;
      this.site_notes             = this.params.data.site_notes            || null;
      this.site_acq_notes         = this.params.data.site_acq_notes        || null;
      this.design_notes           = this.params.data.design_notes          || null;
      this.action_owner           = this.params.data.action_owner          || null;
      this.fdny                   = this.params.data.fdny                  || null;
      this.lpc                    = this.params.data.lpc                   || null;
      this.dob_440sqft            = this.params.data.dob_440sqft           || null;
      this.other_carrier_present  = this.params.data.other_carrier_present || null;
      this.revisit_complete       = this.params.data.revisit_complete      || null;
      this.tppn_received_ae       = this.params.data.tppn_received_ae      || null;
      this.submeter               = this.params.data.submeter              || null;
      this.full_sow_matrix        = this.params.data.full_sow_matrix       || null;
      this.po_received            = this.params.data.po_received           || null;
      this.dv_ready               = this.params.data.dv_ready              || null;
      this.po_issued_ae           = this.params.data.po_issued_ae          || null;
      this.dv_target              = this.params.data.dv_target             || null;
      this.dv_completed           = this.params.data.dv_completed          || null;
      this.dv_summary             = this.params.data.dv_summary            || null;
      this.title_request          = this.params.data.title_request         || null;
      this._2c_ordered            = this.params.data._2c_ordered           || null;
      this._2c_received           = this.params.data._2c_received          || null;
      this._2c_reviewed           = this.params.data._2c_reviewed          || null;
      this._2c_uploaded           = this.params.data._2c_uploaded          || null;
      this._2c_fileName           = this.params.data._2c_fileName          || null;
      this.FDNY_fileName          = this.params.data.FDNY_fileName         || null;
      this.SS_NFC_fileName        = this.params.data.SS_NFC_fileName       || null;
      this.SA_fileName            = this.params.data.SA_fileName           || null;
      this.CD_fileName            = this.params.data.CD_fileName           || null;
      this.Lease_Package_fileName = this.params.data.Lease_Package_fileName|| null;
      this.LPC_Package_fileName   = this.params.data.LPC_Package_fileName  || null;
    }
  
    refresh(params?: any): boolean {
      return true;
    }

    openDialog() {
      console.log('Dialog OPEN!');
      const dialogRef = this.dialog.open(PopUpComponentClose, {
        disableClose: true,
        data: {
          id                    :this.id,
          site_id               :this.site_id               , 
          address               :this.address               ,
          city                  :this.city                  ,
          state                 :this.state                 ,
          zip                   :this.zip                   ,
          county                :this.county                ,
          latitude              :this.latitude              ,
          longitude             :this.longitude             ,
          structure_type        :this.structure_type        ,
          structure_height      :this.structure_height      ,
          site_acq              :this.site_acq              ,
          cm                    :this.cm                    ,
          ae                    :this.ae                    ,
          dish_prio_list        :this.dish_prio_list        ,
          site_notes            :this.site_notes            ,
          site_acq_notes        :this.site_acq_notes        ,
          design_notes          :this.design_notes          ,
          action_owner          :this.action_owner          ,
          fdny                  :this.fdny                  ,
          lpc                   :this.lpc                   ,
          dob_440sqft           :this.dob_440sqft           ,
          other_carrier_present :this.other_carrier_present ,
          revisit_complete      :this.revisit_complete      ,
          tppn_received_ae      :this.tppn_received_ae      ,
          submeter              :this.submeter              ,
          full_sow_matrix       :this.full_sow_matrix       ,
          po_received           :this.po_received           ,
          dv_ready              :this.dv_ready              ,
          po_issued_ae          :this.po_issued_ae          ,
          dv_target             :this.dv_target             ,
          dv_completed          :this.dv_completed          ,
          dv_summary            :this.dv_summary            ,
          title_request         :this.title_request         ,
          _2c_ordered           :this._2c_ordered           ,
          _2c_received          :this._2c_received          ,
          _2c_reviewed          :this._2c_reviewed          ,
          _2c_uploaded          :this._2c_uploaded          ,
          _2c_fileName          :this._2c_fileName          ,
          FDNY_fileName         :this.FDNY_fileName         ,
          SS_NFC_fileName       :this.SS_NFC_fileName       ,
          SA_fileName           :this.SA_fileName           ,
          CD_fileName           :this.CD_fileName           ,
          Lease_Package_fileName:this.Lease_Package_fileName,
          LPC_Package_fileName  :this.LPC_Package_fileName  ,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
          this._2c_fileName           = result[0];
          this.FDNY_fileName          = result[1];
          this.SS_NFC_fileName        = result[2];
          this.SA_fileName            = result[3];
          this.CD_fileName            = result[4];
          this.Lease_Package_fileName = result[5];
          this.LPC_Package_fileName   = result[6];
        }
        const app = this.params.context.componentParent;
        const newData = {
          id                    :this.id,
          site_id               :this.site_id               , 
          address               :this.address               ,
          city                  :this.city                  ,
          state                 :this.state                 ,
          zip                   :this.zip                   ,
          county                :this.county                ,
          latitude              :this.latitude              ,
          longitude             :this.longitude             ,
          structure_type        :this.structure_type        ,
          structure_height      :this.structure_height      ,
          site_acq              :this.site_acq              ,
          cm                    :this.cm                    ,
          ae                    :this.ae                    ,
          dish_prio_list        :this.dish_prio_list        ,
          site_notes            :this.site_notes            ,
          site_acq_notes        :this.site_acq_notes        ,
          design_notes          :this.design_notes          ,
          action_owner          :this.action_owner          ,
          fdny                  :this.fdny                  ,
          lpc                   :this.lpc                   ,
          dob_440sqft           :this.dob_440sqft           ,
          other_carrier_present :this.other_carrier_present ,
          revisit_complete      :this.revisit_complete      ,
          tppn_received_ae      :this.tppn_received_ae      ,
          submeter              :this.submeter              ,
          full_sow_matrix       :this.full_sow_matrix       ,
          po_received           :this.po_received           ,
          dv_ready              :this.dv_ready              ,
          po_issued_ae          :this.po_issued_ae          ,
          dv_target             :this.dv_target             ,
          dv_completed          :this.dv_completed          ,
          dv_summary            :this.dv_summary            ,
          title_request         :this.title_request         ,
          _2c_ordered           :this._2c_ordered           ,
          _2c_received          :this._2c_received          ,
          _2c_reviewed          :this._2c_reviewed          ,
          _2c_uploaded          :this._2c_uploaded          ,
          _2c_fileName          :this._2c_fileName          ,
          FDNY_fileName         :this.FDNY_fileName         ,
          SS_NFC_fileName       :this.SS_NFC_fileName       ,
          SA_fileName           :this.SA_fileName           ,
          CD_fileName           :this.CD_fileName           ,
          Lease_Package_fileName:this.Lease_Package_fileName,
          LPC_Package_fileName  :this.LPC_Package_fileName  ,
        };
        app.refreshCells(this.params.rowIndex, newData);
      });
    }

  }