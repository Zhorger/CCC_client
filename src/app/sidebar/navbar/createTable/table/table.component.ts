import { Component, Inject, LOCALE_ID } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { Service } from 'service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { DOCUMENT, formatDate } from '@angular/common';
import { AppComponent } from 'src/app/app.component.js';
// import { ButtonRendererComponent } from '../../site-popup/T-mobile/TMobilebuttonRender.component';
import { MultipleFilter } from 'src/app/table_assets/filter/multipleFilter.component';
import { FilterDateComponent } from 'src/app/table_assets/filter/FilterDate.component.ts';
import { CellDateComponent } from 'src/app/table_assets/dateManagement/CellDate.component';
import * as moment from 'moment';
import { ViewService } from 'src/app/services/view.service';
import { GridApi, RefreshCellsParams, SideBarDef,} from 'ag-grid-community';

@Component({
    selector: 'app-table',
    template: './table.component.html',
    styleUrls: ['table.component.scss'],
})

export class TableComponent {

  constructor( 
    public viewService: ViewService,
    public http: HttpClient,
    @Inject(DOCUMENT) public _document: Document,
    @Inject(LOCALE_ID) public locale: string
  ){ }

}