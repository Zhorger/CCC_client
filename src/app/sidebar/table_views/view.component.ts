import { 
  Component, EventEmitter, ElementRef,
  HostBinding, Output, HostListener, ComponentFactoryResolver,
  OnChanges, SimpleChanges, Input, ViewChild, ViewContainerRef,
  Inject, Type, ComponentRef, AfterViewInit, OnDestroy,
} from '@angular/core';
import { API_URL } from 'src/app/consts';
import { ViewService } from 'src/app/services/view.service';
import { ViewListComponent } from './view_list/viewList.component';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-view',
    templateUrl: 'view.component.html',
    styleUrls: ['view.component.scss'],
})

export class ViewComponent {

  isFixedviewbar;
  @HostBinding('class.viewbar-opened') viewbarOpened = false;
  @Output() viewData = new EventEmitter<String>();
  @Input() newValue: string;
  @ViewChild('teamContainer', {read: ViewContainerRef, static: true})
  teamContainer: ViewContainerRef;
  @ViewChild('personContainer', {read: ViewContainerRef, static: true})
  personContainer: ViewContainerRef;
  private viewList = this.componentFactoryResolver.resolveComponentFactory(ViewListComponent); 

  constructor(
    public http: HttpClient,
    public elRef:ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewService: ViewService,
    @Inject(DOCUMENT) public _document: Document,
  ) {     
    let component = ViewComponent;
    this.viewService.setComponent(component);
  }

  ngAfterViewInit() {
    console.log(this.personContainer);
    this.viewService.setData(this.personContainer, this.teamContainer, this.viewList);
    this.loadPersonal();
    this.loadTeam();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.newValue.firstChange){
      if(changes.newValue.currentValue === "top-viewbar"){
        if(this.views){
          this.views.classList.value = changes.newValue.currentValue;
        }
      }
    }
  }

  public viewbarOpen: string;
  public views: any;
  public isEditing: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(offset > 10) {
      this.isFixedviewbar = true;
    } else {
      this.isFixedviewbar = false;
    }
  }

  loadPersonal(){
    let viewInfo = this.viewService.loadTableUser();
    this.http.post(`${API_URL}view-loadPersonal`, viewInfo).subscribe(
      (result: any[]) => {
        if (result.length) {
          for (let i = 0; i <= (result.length - 1); i++) {
            this.viewService.setID(result[i]['id']);
            this.viewService.setTable(result[i]['table']);
            this.viewService.setName(result[i]['view_name']);
            this.viewService.setView(result[i]['view_state']);
            this.viewService.setType(result[i]['view_type']);
            this.createView();
          }
        }
      }
    )
  }

  loadTeam(){
    let viewInfo = this.viewService.loadTableUser();
    this.http.post(`${API_URL}view-loadTeam`, viewInfo).subscribe(
      (result: any[]) => {
        if (result.length) {
          for (let i = 0; i <= (result.length - 1); i++) {
            this.viewService.setID(result[i]['id']);
            this.viewService.setTable(result[i]['table']);
            this.viewService.setName(result[i]['view_name']);
            this.viewService.setView(result[i]['view_state']);
            this.viewService.setType(result[i]['view_type']);
            this.createView();
          }
        }
      }
    )
  }

  handleOutsiteClick(){
    if(!this.viewService.popupCheck()){
      if(this.views){
        if(this.views.classList[1]){
          this.views.classList.toggle("opened");
          this.hideEditBtn();
          this.closeBuckets();
        }
      }
    } else {
    this.hideEditBtn();
    this.closeBuckets();
    }
  }

  toggleviewbar() {
    this.viewbarOpened = !this.viewbarOpened;
    this.views = document.getElementById("views");
    this.views.classList.toggle("opened");
    this.viewbarOpen = this.views.classList.value;
    this.viewData.emit(this.viewbarOpen);
  }

  displayViews(){
    console.log("TESTING");
  }

  createView() {
    let type = this.viewService.getType()
    if(type == "personal"){
      this.personContainer.createComponent(this.viewList); 
    } else if(type == "team"){
      this.teamContainer.createComponent(this.viewList);
    }
    let temp = this.viewService.getViewCtr();
    this.viewService.setViewCtr(temp+1);
  }

  hideEditBtn(){
    if(this.isEditing){
      this.toggleEdit();
    }
  }

  toggleEdit() {
    let viewbtn = document.getElementsByClassName("view-label");
    for(let i = 0; i < (viewbtn.length); i++){
      viewbtn[i].classList.toggle("edit");
    }
    let edit = document.getElementsByClassName("edit-label");
    for(let i = 0; i < (edit.length); i++){
      edit[i].classList.toggle("edit");
    }
    this.checkEditing();
    if(this.isEditing){
      this.openBuckets();
    } else {
      this.closeBuckets();
    }
  }

  checkEditing(){
    if(!this.isEditing){
      this.isEditing = true;
    } else {
      this.isEditing = false;
    }
  }

  expandTeam() { 
    var teams = this._document.getElementsByClassName("team");
    var sel = getSelection().toString();
    if(!sel){
      for(let i = 0; i < (teams.length); i++){
        teams[i].classList.toggle('show');
      }
    }
  }

  expandPersonal() {;
    var personals = this._document.getElementsByClassName("personal");
    var sel = getSelection().toString();
    if(!sel){
      for(let i = 0; i < (personals.length); i++){
        personals[i].classList.toggle('show');
      }
    }
  }

  closeBuckets(){
    let checkbox;
    checkbox = document.getElementById("check5");
    if(checkbox.checked) {
      this.expandTeam();
      console.log(checkbox.checked);
      checkbox.checked = false;
    }
    checkbox = document.getElementById("check6");
    if(checkbox.checked) {
      this.expandPersonal();
      console.log(checkbox.checked);
      checkbox.checked = false;
    }
  }

  openBuckets(){
    let checkbox;
    checkbox = document.getElementById("check5");
    if(!checkbox.checked) {
      this.expandTeam();
      console.log(checkbox.checked);
      checkbox.checked = true;
    }
    checkbox = document.getElementById("check6");
    if(!checkbox.checked) {
      this.expandPersonal();
      console.log(checkbox.checked);
      checkbox.checked = true;
    }
  }
}
