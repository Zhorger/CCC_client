import { 
  Component, EventEmitter,
  HostBinding, HostListener, 
  Inject, Output, Input, OnChanges, SimpleChanges, ViewContainerRef, ViewChild 
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavBarService } from 'src/app/services/navbar.service';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnChanges {
  isFixedNavbar;
  @HostBinding('class.navbar-opened') navbarOpened = false;
  @Output() navData = new EventEmitter<String>();
  @Input() 
  newValue: string;

  @ViewChild('tmobile', {read: ViewContainerRef, static: true})
  tmobile: ViewContainerRef;
  @ViewChild('dish', {read: ViewContainerRef, static: true})
  dish: ViewContainerRef;
  @ViewChild('verizon', {read: ViewContainerRef, static: true})
  verizon: ViewContainerRef;
  @ViewChild('at_t', {read: ViewContainerRef, static: true})
  at_t: ViewContainerRef;
  @ViewChild('reference', {read: ViewContainerRef, static: true})
  reference: ViewContainerRef;
  @ViewChild('extra', {read: ViewContainerRef, static: true})
  extra: ViewContainerRef;

  public navbarOpen: string;
  public navbar: any;
  private isEditing: boolean = false;

  constructor(
    @Inject(DOCUMENT) public _document: Document,
    private navbarService: NavBarService,
    private tableService: TableService,
  ) {  }

  ngOnInit(){
    this.checkComp();
  }

  ngAfterViewInit() {
    this.tableService.setContainer(this.tmobile);
    this.tableService.setContainer(this.dish);
    this.tableService.setContainer(this.verizon);
    this.tableService.setContainer(this.at_t);
    this.tableService.setContainer(this.reference);
    this.tableService.setContainer(this.extra);
    // let viewInfo = this.viewService.loadTableUser();
    // this.http.post(`${API_URL}view-load`, viewInfo).subscribe(
    //   (result: any[]) => {
    //     if (result.length) {
    //       for (let i = 0; i <= (result.length - 1); i++) {
    //         this.viewService.setID(result[i]['id']);
    //         this.viewService.setTable(result[i]['table']);
    //         this.viewService.setName(result[i]['view_name']);
    //         this.viewService.setView(result[i]['view_state']);
    //         this.createView();
    //       }
    //     }
    //   }
    // )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.newValue.firstChange){
      if(changes.newValue.currentValue === "top-navbar"){
        if(this.navbar){
          this.navbar.classList.value = changes.newValue.currentValue;
        }
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(offset > 10) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  handleOutsiteClick(){
    if(!this.navbarService.popupCheck()){
      if(this.navbar){
        if(this.navbar.classList[1]){
          this.navbar.classList.toggle("opened")
          this.hideEditBtn();
          this.closeBuckets();
        }
      }
    } else {
      this.hideEditBtn();
      this.closeBuckets();
    }
  }


  changeToggle(value: string): void{
    this.navbar.classList.value = value;
  }

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
    this.navbar = this._document.getElementById("navbar");
    this.navbar.classList.toggle("opened")
    // if(navbar.classList[1]){
    //   this.navbarOpen = true;
    // } else {
    //   this.navbarOpen = false;
    // }
    this.navbarOpen = this.navbar.classList.value;
    this.navData.emit(this.navbarOpen);
  }

  hideEditBtn(){
    if(this.isEditing){
      this.toggleEdit();
    }
  }

  toggleEdit() {
    let tablebtn = document.getElementsByClassName("table-button");
    for(let i = 0; i < (tablebtn.length); i++){
      tablebtn[i].classList.toggle("edit");
    }
    let edit = document.getElementsByClassName("edit-button");
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

  //Check if location is table or home, adjusts size.
  checkComp(){
    let temp = this.navbarService.getComponent();
    console.log(temp);
    if(temp == undefined){
      let edit = document.getElementById("list");
      edit.classList.toggle("home");
    }       
  }

  //Controls for the table buckets.
  expandTMobile() { 
    var tmobiles = this._document.getElementsByClassName("tmobiles");
    var sel = getSelection().toString();
    if(!sel){
      for(let i = 0; i < (tmobiles.length); i++){
        tmobiles[i].classList.toggle('show');
      }
    }
  }

  expandDish() {
    var dishs = this._document.getElementsByClassName("dishs");
    var sel = getSelection().toString();
    if(!sel){
      for(let i = 0; i < (dishs.length); i++){
        dishs[i].classList.toggle('show');
      } 
    }
  }

  expandExtra() {
    var extras = this._document.getElementsByClassName("extras");
    var sel = getSelection().toString();
    if(!sel){
      for(let i = 0; i < (extras.length); i++){
        extras[i].classList.toggle('show');
      } 
    }
  }

  expandReferences() {
    var references = this._document.getElementsByClassName("references");
    var sel = getSelection().toString();
    if(!sel){
      for(let i = 0; i < (references.length); i++){
        references[i].classList.toggle('show');
      } 
    }
  }

  closeBuckets(){
    let checkbox;
    checkbox = document.getElementById("check1");
    if(checkbox.checked) {
      this.expandTMobile();
      console.log(checkbox.checked);
      checkbox.checked = false;
    }
    checkbox = document.getElementById("check2");
    if(checkbox.checked) {
      this.expandDish();
      console.log(checkbox.checked);
      checkbox.checked = false;
    }    
    checkbox = document.getElementById("check3");
    if(checkbox.checked) {
      this.expandReferences();
      console.log(checkbox.checked);
      checkbox.checked = false;
    }
    checkbox = document.getElementById("check4");
    if(checkbox.checked) {
      this.expandExtra();
      console.log(checkbox.checked);
      checkbox.checked = false;
    }
  }

  openBuckets(){
    let checkbox;
    checkbox = document.getElementById("check1");
    if(!checkbox.checked) {
      this.expandTMobile();
      console.log(checkbox.checked);
      checkbox.checked = true;
    }
    checkbox = document.getElementById("check2");
    if(!checkbox.checked) {
      this.expandDish();
      console.log(checkbox.checked);
      checkbox.checked = true;
    }    
    checkbox = document.getElementById("check3");
    if(!checkbox.checked) {
      this.expandReferences();
      console.log(checkbox.checked);
      checkbox.checked = true;
    }
    checkbox = document.getElementById("check4");
    if(!checkbox.checked) {
      this.expandExtra();
      console.log(checkbox.checked);
      checkbox.checked = true;
    }
  }
}