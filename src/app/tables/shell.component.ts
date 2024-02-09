import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ViewService } from '../services/view.service';
import { NavBarService } from '../services/navbar.service';
import { ViewComponent } from '../sidebar/table_views/view.component';


@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
})

export class shellComponent implements OnInit {

    constructor(
        private viewService: ViewService,
        private navbarService: NavBarService
    ) { 
        
    }

    ngOnInit(): void {
        
    }

    @ViewChild('table', {read: ViewContainerRef, static: true})
    table: ViewContainerRef;
    routerOutletComponent: object;
    routerOutletComponentClassName: string;
    counter: number = 0;
    event: any;
    api: object;
    container: ViewContainerRef;

    ngAfterViewInit(){
        this.navbarService.setContainer(this.table);
    }
  
    onActivate(event: any) {
        let service;
        for (var name in event) {
            if (name.indexOf('Service') > 0) {
                if((name.indexOf('view') < 0)) {
                    service = event[name];
                    break;
                }
            }
        }
        console.log(event);
        //console.log("STILL RUNNING?")
        this.routerOutletComponentClassName = event.constructor.name;
        this.navbarService.setComponent(this.routerOutletComponentClassName);
        //console.log(this.routerOutletComponentClassName);
        this.viewService.setTableService(event.tableName, service);
        if(this.counter > 0){
            window.location.reload();
        }
        this.counter++;
    }

    public newValue: string;

    public childData($event: any): void{
        if($event === "top-viewbar opened"){
            this.newValue = "top-navbar";
        }
        if($event === "top-navbar opened"){
            this.newValue = "top-viewbar";
        }
    }
}
