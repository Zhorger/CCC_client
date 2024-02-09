import { ChangeDetectionStrategy, Component, LOCALE_ID, Inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { API_URL } from 'src/app/consts';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { TableService } from 'src/app/services/table.service';
import { NavBarService } from 'src/app/services/navbar.service';

@Component({
    selector: 'app-edittable-popup',
    template: `
    <button id="editbtn" class="edit-button" mat-flat-button (click)=openDialog()>
        <span class="material-symbols-outlined">
          edit
        </span>
    </button>    
  `,
    styleUrls: ['editView.component.scss'],
})

export class EditTableComponent {
  params;
  id                      : number;
  client                  : string;
  table_name              : string;
  
  constructor(
    private cref: ChangeDetectorRef,
    private tableService: TableService,
    private navbarService: NavBarService,
    public dialog: MatDialog,     
    public http: HttpClient,
    @Inject(DOCUMENT) public _document: Document,
    @Inject(LOCALE_ID) public locale: string,
  ) { 
    let temp = this.tableService.loadTable();
    this.client           = temp[0];
    this.table_name       = temp[1];
  }

  refresh(params?: any): boolean {
    return true;
  }

  openDialog() {
    this.navbarService.popupOpen();
    const dialogRef = this.dialog.open(EditTableComponentComponentClose,  {
      disableClose: true,
      data: {
        id               : this.id            ,
        client           : this.client        ,
        table_name       : this.table_name    ,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.navbarService.popupClose();
      if(result){

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
      selector: 'app-editview-popupClose',
      template: `
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <h1 mat-dialog-title style="margin: 0 0 -4px;">
        Edit View
        <button mat-button color="warn" [mat-dialog-close]="" style="float: right;" (click)="delete()">Delete View</button> 
      </h1> 
      
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <h1 mat-dialog-title style="margin: 0 0 10px">Table Form</h1>

      <div mat-dialog-content class="mat-typography dialog popup" style="height: 65vh; max-height: 65vh;">
        <mat-tab-group>
          <mat-tab label="Table Information">
            <section class="layout" (change)="onTextChanged($event)">
                <div>
                    <form>
                      <p class="no_marg"><label for="client">Client Name:</label></p>
                      <textarea class="line" id="client" name="siteViewForm">{{client}}</textarea>
                    </form>
                </div>
                <div>
                    <form>
                      <p class="no_marg"><label for="table_name">Table Name:</label></p>
                      <textarea class="line" id="table_name" name="siteViewForm">{{table_name}}</textarea>
                    </form>
                </div>
                <ng-container #container></ng-container>
            </section>
          </mat-tab>
          <mat-tab label="Files">
            <section class="layout" (change)="onTextChanged($event)">
                <ng-container #fileContainer></ng-container>
            </section>
          </mat-tab>
        </mat-tab-group>
      </div>
        
      <mat-dialog-actions align="end">
        <button mat-button [mat-dialog-close]="">Cancel</button>
        <button mat-button color="primary" cdkFocusInitial (click)="editTable()" [mat-dialog-close]="[table_name, client]">Edit Table</button>
      </mat-dialog-actions>   
      `,
      styleUrls: ['editView.component.scss'],
      changeDetection: ChangeDetectionStrategy.OnPush,
  })
  
  export class EditTableComponentComponentClose {

  viewData :any;
  container: any;
  component: any;
  id                      : number;
  client                   : string;
  table_name               : string;
  
  constructor(
    public dialogRef: MatDialogRef<EditTableComponentComponentClose>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) public _document: Document,
    public http: HttpClient,
    public elRef:ElementRef,
    private tableService: TableService,
  ) { }

  ngOnInit() {
    this.id            = this.data.id                ; 
    this.client        = this.data.client            ; 
    this.table_name    = this.data.table_name        ; 
  }

  onTextChanged(event){
    if(event.target.id == 'view_name'){
      this.table_name = event.target.value.toString();
    }
    this.tableService.setName(this.table_name);
  }

  editTable() {
    //let viewInfo = this.viewService.viewInformation();
    //console.log(JSON.stringify(this.viewService.viewInformation()));
    //this.http.post(`${API_URL}view-updateCreate`, viewInfo).subscribe()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(){
    //let viewInfo = this.viewService.viewInformation();
    //this.http.post(`${API_URL}view-delete`, viewInfo).subscribe(
    //  () => {
    //    this.refreshPage();
    //  }
    //)
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

}