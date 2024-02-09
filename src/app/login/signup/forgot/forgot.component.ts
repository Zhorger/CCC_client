import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss'],
})

export class ForgotComponent {

    forgotForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required),
    });

    constructor(private router: Router, private https: HttpClient){}

    forgot(){
        if(this.forgotForm.invalid) {
            alert('Please fill all the fields before creating your account');
            return;
        }
        if(this.forgotForm.value.password == this.forgotForm.value.password2){
            let result;
            const data = new FormData(); 
            data.append('email', this.forgotForm.value.email);
            data.append('password', this.forgotForm.value.password);
            this.https.post(`${API_URL}main-forgot`, data).subscribe(
            (response: any) => { 
                result = response;
                if(result){
                    alert("Password has been changed!");
                    this.router.navigate(['login']);
                } else {
                   alert('Email does not exist');
                }
            });
        } else {
            alert("Passwords do not match");
        }
    }

}
