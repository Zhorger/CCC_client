import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTimeRenderer } from './table_assets/dateManagement/DateTimeFormatter';
import { NavbarComponent } from './sidebar/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { TMobileComponent } from './tables/T-Mobile/tmobile.component';
import { DishComponent } from './tables/Dish/dish.component';
import { HomeComponent } from './Home/home.component';
import { PopUpComponentClose } from './site-popup/DishNB/DIshNBpopup.component'
import { TMobilePopUpComponentClose } from './site-popup/T-mobile/TMobilepopup.component';
import { MultipleFilter } from './table_assets/filter/multipleFilter.component';
import { APP_BASE_HREF } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterDateComponent } from './table_assets/filter/FilterDate.component.ts'
import { CellDateComponent } from './table_assets/dateManagement/CellDate.component';
import { LoginComponent } from './login/login.component';
import { shellComponent } from './tables/shell.component';
import { SignupComponent } from './login/signup/signup.component';
import { CreatedComponent } from './login/signup/created/created.component';
import { ForgotComponent } from './login/signup/forgot/forgot.component';
import { AuthGuard } from './login/auth.guard';
import { ViewComponent } from './sidebar/table_views/view.component';
import { UserBannerComponent } from './info-user/userBanner.component';
import { ClickedOutsideDirective } from './directive/clicked-out.directive';
import { UserComponent } from './tables/User/user.component';
import { TMOFinanceComponent } from './tables/T-Mobile/finance/finance.component';
import { ViewListComponent } from './sidebar/table_views/view_list/viewList.component';
import { ViewPopupComponent, ViewPopupComponentClose } from './sidebar/table_views/view_popup.component';
import { ViewService } from './services/view.service';
import { EditViewComponent, EditViewComponentComponentClose } from './sidebar/table_views/edit_view/editView.component';
import { TableService } from './services/table.service';
import { TableComponent } from './sidebar/navbar/createTable/table/table.component';
import { TablePopupComponent, TablePopupComponentClose } from './sidebar/navbar/createTable/createTable.component';
import { NavBarService } from './services/navbar.service';
import { TableListComponent } from './sidebar/navbar/createTable/table_list/tableList.component';
import { EditTableComponent, EditTableComponentComponentClose } from './sidebar/navbar/createTable/edit_table/editTable.component';

const routes: Routes = [
  {
    path: 'tables', //'tables'
    canActivate: [AuthGuard],
    component: shellComponent,
    children: [ 
      { path: 'dish', component: DishComponent },
      { path: 't-mobile', component: TMobileComponent },
      { path: 'users', component: UserComponent },
      { path: 't-mobile/finance', component: TMOFinanceComponent },
      { path: ':type', component: TableComponent },
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'created', component: CreatedComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];


@NgModule({
  declarations: [ 
    NavbarComponent, AppComponent, shellComponent, TMobileComponent, 
    DishComponent, UserComponent, PopUpComponentClose, TMobilePopUpComponentClose,
    MultipleFilter, FilterDateComponent, CellDateComponent, LoginComponent, SignupComponent,
    CreatedComponent, HomeComponent, ForgotComponent, ViewComponent, UserBannerComponent,
    ClickedOutsideDirective, TMOFinanceComponent, ViewListComponent, ViewPopupComponent, ViewPopupComponentClose,
    EditViewComponent, EditViewComponentComponentClose, TableComponent, TablePopupComponent,
    TablePopupComponentClose, TableListComponent, EditTableComponent, EditTableComponentComponentClose,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([DateTimeRenderer, TMOFinanceComponent, TMobileComponent, UserComponent, DishComponent, MultipleFilter, FilterDateComponent, CellDateComponent,]),
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, [AuthGuard], [ViewService, TableService, NavBarService]],
})
export class AppModule { }
