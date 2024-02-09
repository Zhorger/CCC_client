import { Component, Inject, LOCALE_ID } from '@angular/core';
import { OlympicWinnersService } from "../olympic-winners.service";
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../consts';
import { DOCUMENT} from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {

  constructor( ){ }

}