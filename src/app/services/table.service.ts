import { Injectable } from '@angular/core';

@Injectable()
export class TableService{
    private name: string = undefined;
    private category: string = undefined;
    private component: any = undefined;
    private counter: number; 
    private fileCounter: number;
    private tableCtr: number = 0;
    private colArr: Array<string> = new Array;
    private colType: Array<string> = new Array;
    private fileArr: Array<string> = new Array;
    private fileType: Array<string> = new Array;
    private container: Array<string> = new Array;

    setComponent(component:any){
        this.component = component;
    }

    getComponent():any{
        return this.component;
    }

    setName(name: string){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setContainer(container: any){
        this.container.push(container);
    }

    getContainer(){
        return this.container;
    }

    setCategory(category: string){
        this.category = category;
    }

    getCategory(){
        return this.category;
    }

    setCount(counter: number){
        this.counter = counter;
    }

    getCount(){
        return this.counter;
    }
    
    setTableCtr(tableCtr: number){
        this.tableCtr = tableCtr;
    }

    getTableCtr(){
        return this.tableCtr;
    }

    addIndexColArr(){
        this.colArr.push();
    }

    setColArr(col: string, counter: number){
        this.colArr[counter-1] = col; 
        console.log(this.colArr)
    }

    getColArr(){
        return this.colArr;
    }

    setColType(type: string, counter: number){
        this.colType[counter-1] = type; 
        console.log(this.colType)
    }

    getColType(){
        return this.colType;
    }

    setFileCount(counter: number){
        this.fileCounter = counter;
    }

    getFileCount(){
        return this.fileCounter;
    }

    addIndexFileArr(){
        this.fileArr.push();
    }

    setFileArr(col: string, counter: number){
        this.fileArr[counter-1] = col; 
        console.log(this.fileArr)
    }

    getFileArr(){
        return this.fileArr;
    }

    setFileType(type: string, counter: number){
        this.fileType[counter-1] = type; 
        console.log(this.fileType)
    }

    getFileType(){
        return this.fileType;
    }

    loadTable(){
        return [this.category, this.name];
    }

}