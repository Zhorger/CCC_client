import { ChangeDetectionStrategy, Component, LOCALE_ID, Inject, Input, ComponentFactoryResolver, ElementRef, Type, ChangeDetectorRef  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { API_URL } from 'src/app/consts';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { ViewService } from 'src/app/services/view.service';

@Component({
    selector: 'app-view-popup',
    template: `
    <button class="view-create black-a" mat-raised-button (click)="openDialog()"
    id="create" style="margin-bottom: 15px; background: #1b7c31;">
      <a><strong>Save Current View</strong></a>
    </button> 
  `,
    styleUrls: ['view_popup.component.scss'],
})

export class ViewPopupComponent {
  params;
  id                      : number;
  user                    : string;
  table_states            : string;
  table                   : string;
  view_name               : String;
  view : any;
  colArray: Array<{}> = new Array;
  
  constructor(
    private viewService: ViewService,
    public dialog: MatDialog,     
    public http: HttpClient,
    @Inject(DOCUMENT) public _document: Document,
    @Inject(LOCALE_ID) public locale: string,
  ) { }

  refresh(params?: any): boolean {
    return true;
  }

  openDialog() {
    let colstate = this.viewService.getGrid();
    console.log(colstate);
    // colState is a GridColumnApi Object
    this.viewService.setView(colstate.getColumnState());
    this.viewService.setID(null);
    console.log('Dialog OPEN!');
    this.viewService.popupOpen();
    const dialogRef = this.dialog.open(ViewPopupComponentClose,  {
      disableClose: true,
      data: {
        view_name           :this.view_name,
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
      selector: 'app-view-popupclose',
      template: `
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <h1 mat-dialog-title style="margin: 0 0 -4px;">View Form</h1>

      <div mat-dialog-content class="mat-typography dialog popup">
        <section class="layout" (change)="onTextChanged($event)">
          <div>
            <form>
              <p class="no_marg"><label for="view_name">Name of View:</label></p>
              <textarea class="line" id="view_name" name="siteViewForm">{{view_name}}</textarea>
            </form>
            <form>
              <p class="no_marg"><label for="view_type">Type of View:</label></p>
              <select id="category" class="line" required>
                <option> Select Category </option>
                <option value="team">Team View</option>
                <option value="personal">Personal View</option>
              </select>
            </form>
          </div>
        </section>
      </div>
        
      <mat-dialog-actions align="end">
        <button mat-button [mat-dialog-close]="">Cancel</button>
        <button mat-button color="primary" cdkFocusInitial (click)="createView()" [mat-dialog-close]="[view_name, view_type, id]">Create View</button>
      </mat-dialog-actions>   
      `,
      styleUrls: ['view_popup.component.scss'],
      changeDetection: ChangeDetectionStrategy.OnPush,
  })
  
  export class ViewPopupComponentClose {

  viewData :any;
  pContainer: any;
  tContainer: any;
  component: any;
  id                      : number;
  user                    : string;
  table_states            : string;
  table                   : string;
  view_name               : string;
  view_type               : string;
  
  constructor(
    public dialogRef: MatDialogRef<ViewPopupComponentClose>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) public _document: Document,
    public http: HttpClient,
    public elRef:ElementRef,
    private viewService: ViewService,
  ) {

  }

  ngOnInit() {
    this.viewData = this.viewService.getData();
    this.pContainer = this.viewData[0];
    this.tContainer = this.viewData[1];
    this.component = this.viewData[2];
  }

  onTextChanged(event){
    console.log(event);
    if(event.target.id == 'view_name'){
      this.view_name = event.target.value.toString();
    }
    if(event.target.id == 'category'){
      this.view_type = event.target.value.toString();
    }
    this.viewService.setName(this.view_name);
    this.viewService.setType(this.view_type);
  }

  createView() {
    let type = this.viewService.getType();
    if(type == "personal"){
      this.pContainer.createComponent(this.component); 
    } else if(type == "team"){
      this.tContainer.createComponent(this.component);
    }
    let temp = this.viewService.getViewCtr();
    this.viewService.setViewCtr(temp+1);
    let viewInfo = this.viewService.viewInformation();
    this.http.post(`${API_URL}view-updateCreate`, viewInfo, ).subscribe(result => {
      this.viewService.setID(result);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

}