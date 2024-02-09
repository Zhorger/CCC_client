import { ChangeDetectionStrategy, Component, LOCALE_ID, Inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { API_URL } from 'src/app/consts';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { ViewService } from 'src/app/services/view.service';
import { ViewListComponent } from '../view_list/viewList.component';

@Component({
    selector: 'app-editview-popup',
    template: `
    <button id="editbtn" class="edit-label" mat-flat-button (click)=openDialog()>
        <span class="material-symbols-outlined">
          edit
        </span>
    </button>    
  `,
    styleUrls: ['editView.component.scss'],
})

export class EditViewComponent {
  params;
  id                      : number;
  user                    : string;
  table_states            : string;
  table                   : string;
  view_name               : string;
  view : any;
  colArray: Array<{}> = new Array;
  
  constructor(
    private cref: ChangeDetectorRef,
    private viewService: ViewService,
    public dialog: MatDialog,     
    public http: HttpClient,
    @Inject(DOCUMENT) public _document: Document,
    @Inject(LOCALE_ID) public locale: string,
  ) { 
    let temp = this.viewService.loadView();
    this.user           = temp[0];
    this.table          = temp[1];
    this.view_name      = temp[2];
    this.table_states   = temp[3];
    this.id             = temp[4];
  }

  refresh(params?: any): boolean {
    return true;
  }

  openDialog() {
    let colstate = this.viewService.getGrid();
    console.log(colstate);
    // colState is a GridColumnApi Object
    this.viewService.setView(colstate.getColumnState());
    // this.viewService.setColumn(this.colArray);
    console.log('Dialog OPEN!');
    this.viewService.popupOpen();
    const dialogRef = this.dialog.open(EditViewComponentComponentClose,  {
      disableClose: true,
      data: {
        id           : this.id          ,
        user         : this.user        ,
        table        : this.table       ,
        view_name    : this.view_name   ,
        table_states : this.table_states,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.viewService.popupClose();
      if(result){
        this.view_name = result;
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
      

      <div mat-dialog-content style="overflow: visible;" class="mat-typography dialog popup">
        <section class="layout" (change)="onTextChanged($event)">
          <div>
            <form>
              <p class="no_marg"><label for="view_name">Name of View:</label></p>
              <textarea class="line" id="view_name" name="siteViewForm">{{view_name}}</textarea>
            </form>
          </div>
        </section>
      </div>
        
      <mat-dialog-actions align="end">
        <button mat-button [mat-dialog-close]="">Cancel</button>
        <button mat-button color="primary" cdkFocusInitial (click)="editView()" [mat-dialog-close]="[view_name]">Edit View</button>
      </mat-dialog-actions>   
      `,
      styleUrls: ['editView.component.scss'],
      changeDetection: ChangeDetectionStrategy.OnPush,
  })
  
  export class EditViewComponentComponentClose {

  viewData :any;
  container: any;
  component: any;
  id                      : number;
  user                    : string;
  table_states            : string;
  table                   : string;
  view_name               : string;
  prev_name               : string;
  
  constructor(
    public dialogRef: MatDialogRef<EditViewComponentComponentClose>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) public _document: Document,
    public http: HttpClient,
    public elRef:ElementRef,
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    if(this.data.id){
      this.id      = this.data.id               ; 
      this.viewService.setID(this.id);
    } else {
      this.id = this.viewService.getID();
    }
    this.user         = this.data.user             ; 
    this.table        = this.data.table            ; 
    this.view_name    = this.data.view_name        ; 
    this.table_states = this.data.table_states     ; 
    this.viewData = this.viewService.getData();
    this.container = this.viewData[0];
    this.component = this.viewData[1];
  }

  onTextChanged(event){
    if(event.target.id == 'view_name'){
      this.prev_name = this.view_name;
      this.view_name = event.target.value.toString();
    }
    this.viewService.setName(this.view_name);
  }

  editView() {
    this.editState();
    let component = this.viewService.getViewComponent();
    for(let i = 0; component.length > i; i++){
      if(component[i].view_name == this.prev_name){
        component[i].setName_State();
      }
    }
    let viewInfo = this.viewService.viewInformation();
    console.log(JSON.stringify(this.viewService.viewInformation()));
    this.http.post(`${API_URL}view-updateCreate`, viewInfo).subscribe()
  }

  editState(){
    let colstate = this.viewService.getGrid();
    this.viewService.setView(colstate.getColumnState());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(){
    let viewInfo = this.viewService.viewInformation();
    this.http.post(`${API_URL}view-delete`, viewInfo).subscribe(
      () => {
        this.refreshPage();
      }
    )
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

}