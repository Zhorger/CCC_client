import { 
    Component,
} from '@angular/core';
import { ViewService } from 'src/app/services/view.service';

export interface DialogData { }
  
  @Component({
      selector: 'app-view-list',
      template: `
      <div id="div{{this.viewCtr}}" class="table-div">
        <button id="viewbtn{{this.viewCtr}}" class="view-label" mat-stroked-button (click)="this.applyView()">
          <strong><a>{{view_name}}</a></strong>
        </button>
        <app-editview-popup></app-editview-popup>
      <div>
      `,
      styleUrls: ['viewList.component.scss'],
  })
  
  export class ViewListComponent {

    someSubscription: any;
    user: number;
    table: string;
    view_name: string;
    view_state: object;
    type    : string;
    viewCtr : number;

    constructor(
      private viewService: ViewService,
    ){
      let temp = this.viewService.loadView();
      this.user       = temp[0];
      this.table      = temp[1];
      this.view_name  = temp[2];
      this.view_state = temp[3];
      this.type       = temp[5];
      this.viewCtr    = this.viewService.getViewCtr();
      this.viewService.setViewComponent(this);
    }

    ngAfterViewInit() {
      this.typeDecloration();
    }

    //Checking User if view is personal or public
    typeDecloration(){
      //Need counter to distinguish been each view element
      let tempId = "viewbtn" + this.viewCtr;
      let divID = "div" + this.viewCtr;
      let viewDiv = document.getElementById(tempId);
      let divId = document.getElementById(divID);
      viewDiv.classList.add(this.type);
      divId.classList.add(this.type);
    }

    setName_State(){
      this.view_name = this.viewService.getName();
      this.view_state = this.viewService.getView();
    }

    applyView(){
      let grid = this.viewService.getGrid();
      console.log(grid);
      console.log(this.viewService.getView());
      grid.applyColumnState({ state: this.view_state });
    }
  }