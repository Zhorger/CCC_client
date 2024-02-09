import { Component, Inject, LOCALE_ID,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../consts';
import { DOCUMENT} from '@angular/common';
import { ViewService } from '../services/view.service';

@Component({
    selector: 'app-userBanner',
    templateUrl: 'userBanner.component.html',
    styleUrls: ['userBanner.component.scss']
})

export class UserBannerComponent{
    public userName;
    public userEmail;
    public subMenu;
    
    constructor(
        public http: HttpClient,
        @Inject(DOCUMENT) public _document: Document,
        @Inject(LOCALE_ID) public locale: string,
        private viewService: ViewService
    ){
        this.subMenu = this._document.getElementById("subMenu");
        let data = {token: Number, email: String}
        data[0] = localStorage.getItem('token');
        if(!data[0]){
            data[1] = sessionStorage.getItem('email');  
        } else {
            data[1] = null;
        }
        if(localStorage.getItem('RememberMe') == 'true'){
            this.userName = localStorage.getItem('name');
            this.userEmail = localStorage.getItem('email');
        } else {
            this.userName = sessionStorage.getItem('name');
            this.userEmail = sessionStorage.getItem('email');
        }
        this.viewService.setUser(this.userEmail);
    }

    handleOutsiteClick(){
        if(this.subMenu){
            if(this.subMenu.classList[1]){
                this.subMenu.classList.toggle("open-menu")
            }
        }
    }

    toggleMenu(){
        this.subMenu = this._document.getElementById("subMenu");
        this.subMenu.classList.toggle("open-menu")
    }

    logout(){
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('RememberMe');
        localStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('RememberMe');
        sessionStorage.removeItem('token');
        this._document.defaultView.location.reload();
      }


}