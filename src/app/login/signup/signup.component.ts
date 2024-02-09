import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['../login.component.scss'],
})

export class SignupComponent {

    signupForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required),
        first: new FormControl('', Validators.required),
        last: new FormControl('', Validators.required),
    });

    constructor(private router: Router, private https: HttpClient){}

    signup(){
        if(this.signupForm.invalid) {
            alert('Please fill all the fields before creating your account');
            return;
        }
        if(this.signupForm.value.password != this.signupForm.value.password2){
            alert('Passwords do not match! Please double check passwords.');
            return;
        } else{
            let arr = this.signupForm.value.email.split("@");
            if(arr[1] == "cherundoloconsulting.com"){
            const data = new FormData(); 
            data.append('email', this.signupForm.value.email);
            data.append('password', this.signupForm.value.password);
            data.append('name', this.signupForm.value.first + " " + this.signupForm.value.last);
            this.https.post(`${API_URL}main-signup`, data).subscribe(
                (response: any) => {
                    if(response){
                        this.router.navigate(['created']);
                    } else {
                        alert('Email is already in use.');
                    }  
                });
            } else {
                alert('Email does not match requirement. Please double check if email is spelled correctly.');
            }
        }
    }

}
