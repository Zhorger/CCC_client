import { HttpClient } from '@angular/common/http';
import { API_URL } from '../consts';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });
    public rememberMe:boolean;
    public userName:string;

    constructor(private router: Router, private https: HttpClient) {
        const rememberMe = localStorage.getItem('rememberMe');
        if (rememberMe === 'true') {
          this.loginForm.value.email = localStorage.getItem('email');
          this.loginForm.value.password = localStorage.getItem('password');
          this.loginForm.value.remember = true;
        }
        const token = localStorage.getItem('token');
        const email = sessionStorage.getItem('email');
        if(token || email){
            router.navigate(['/home']);
        }
    }

    login(){
        if(this.loginForm.invalid){
            alert('Please fillout all of the fields')
            return;
        }
        let result = {rememberMe: Boolean, token: Number};
        let credentials = new FormData();
        const data = new FormData(); 
        data.append('email', this.loginForm.value.email);
        data.append('password', this.loginForm.value.password);
        if(this.rememberMe){
            data.append('remember', 'true');
        }
        this.https.post(`${API_URL}main-login`, data).subscribe(
        (response) => {
            result[0] = response[0];
            result[1] = response[1];
            credentials.append('email', this.loginForm.value.email);
            this.https.post(`${API_URL}main-getName`, credentials).subscribe(
                (response) => {
                    this.userName = <string>response;
                    if(result[0]){
                        if(this.rememberMe){
                            localStorage.setItem('email', this.loginForm.value.email);
                            localStorage.setItem('password', this.loginForm.value.password);
                            localStorage.setItem('RememberMe', 'true');
                            localStorage.setItem('token', result[1]);
                            localStorage.setItem('name', this.userName);
                        } else {
                            localStorage.removeItem('email');
                            localStorage.removeItem('password');
                            localStorage.removeItem('RememberMe');
                            localStorage.removeItem('token');
                            localStorage.removeItem('name');
                            //
                            sessionStorage.setItem('email', this.loginForm.value.email);
                            sessionStorage.setItem('name', this.userName);
                        }
                        this.router.navigate(['home']);
                } else {
                    alert('Incorrect Email or Password');
                }
            });
        });
    }
    
}
