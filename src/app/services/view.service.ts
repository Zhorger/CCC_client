import { Injectable } from '@angular/core';

@Injectable()
export class ViewService{
    private personView:any = undefined;
    private teamView:any = undefined;
    private list:any = undefined;
    private checkPop: boolean;
    private name: string = undefined;
    private table: string = undefined;
    private service: string = undefined;
    private state: any = undefined;
    private gridCol: any = undefined;
    private user: any = undefined;
    private component: any = undefined;
    private id: any = undefined;
    private viewComponent: Array<any> = new Array;
    private viewCtr: number = 0;
    private type: any = undefined;

    setData(pView:any, tView:any, list: any){
        this.personView = pView;
        this.teamView = tView;
        this.list = list;
    }

    getData():any{
        return [this.personView, this.teamView, this.list];
    }

    setName(name:string){
        this.name = name;
    }

    getName():any{
        return this.name;
    }

    popupCheck() {
        return this.checkPop;
    }

    popupOpen(){
        this.checkPop = true;
        return this.checkPop;
    }

    popupClose(){
        this.checkPop = false;
        return this.checkPop;
    }

    hideEditBtn(){
        return true;
    }

    setTableService(table: string, service: string){
        this.table = table;
        this.service = service;
    }

    getTableService(){
        return [this.table, this.service];
    }

    setTable(table: string){
        this.table = table;
    }

    getTable(){
        return this.table;
    }

    
    setGrid(gridCol: any){
        this.gridCol = gridCol;
    }

    getGrid(){
        return this.gridCol;
    }

    setView(state: any){
        this.state = state;
    }

    getView(){
        return this.state;
    }

    setID(id: any){
        this.id = id;
    }

    getID(){
        return this.id;
    }

    setUser(user: any){
        this.user = user;
    }

    setType(type: any){
        this.type = type;
    }

    getType(){
        return this.type;
    }

    setComponent(component: any){
        this.component = component;
    }

    getComponent(){
        return this.component;
    }

    loadView(){
        return [this.user, this.table, this.name, this.state, this.id, this.type]
    }

    setViewComponent(component: any){
        this.viewComponent.push(component); 
    }

    getViewComponent(){
        return this.viewComponent;
    }

    viewInformation(){
        let temp = new FormData();
        temp.append('table', this.table.toString());
        temp.append('user', this.user.toString());
        temp.append('name', this.name.toString());
        temp.append('state', JSON.stringify(this.state));
        temp.append('type', this.type.toString());
        if(this.id){
            temp.append('id', this.id.toString());
        }
        return temp;
    }

    loadTableUser(){
        let temp = new FormData();
        temp.append('table', this.table);
        temp.append('user', this.user);
        return temp;
    }

    setViewCtr(viewCtr: number){
        this.viewCtr = viewCtr;
    }

    getViewCtr(){
        return this.viewCtr;
    }
}
