import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyButtonComponent } from './my-button/my-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MytablenotmaterialComponent, NgbdSortableHeader} from './mytablenotmaterial/mytablenotmaterial.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PaginationPipe} from './paginate/pagination.pipe';
import {PaginateComponent} from './paginate/paginate.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import {httpInterceptorProviders} from './services/data/auth/auth-interceptor';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CarlistComponent } from './carlist/carlist.component';
import { CaraddComponent } from './caradd/caradd.component';
import { BookingaddComponent } from './bookingadd/bookingadd.component';

@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    HomeComponent,
    DialogBoxComponent,
    MytablenotmaterialComponent,
    NgbdSortableHeader,
    PaginationPipe,
    PaginateComponent,
    PaginateComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CarlistComponent,
    CaraddComponent,
    BookingaddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    NgbModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
