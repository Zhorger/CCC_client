import { Injectable } from '@angular/core';

@Injectable()
export class NavBarService{
    private component: string = undefined;
    private container: any = undefined;
    private checkPop: boolean = false;
    colArr: Array<any> = new Array;
    colType: Array<any> = new Array;
    fileArr: Array<any> = new Array;
    fileType: Array<any> = new Array;

    setComponent(component:any){
        this.component = component;
    }

    getComponent():any{
        return this.component;
    }

    setContainer(container:any){
        this.container = container;
    }

    getContainer():any{
        return this.container;
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

    setColArr(colArr: any){
        this.colArr = colArr; 
        console.log(this.colArr)
    }

    getColArr(){
        return this.colArr;
    }

    setColType(colType: any){
        this.colType = colType; 
        console.log(this.colType)
    }

    getColType(){
        return this.colType;
    }

    setFileArr(fileArr: any){
        this.fileArr = fileArr; 
        console.log(this.fileArr);
    }

    getFileArr(){
        return this.fileArr;
    }

    setFileType(file_type: any){
        this.fileType = file_type; 
        console.log(this.fileType)
    }

    getFileType(){
        return this.fileType;
    }

}