import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-created',
    templateUrl: './created.component.html',
    styleUrls: ['./created.component.scss'],
})

export class CreatedComponent {

    constructor(private router: Router){}

    created(){
        this.router.navigate(['Login'])
    }

}
