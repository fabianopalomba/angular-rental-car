import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CarlistComponent} from './carlist/carlist.component';
import {CaraddComponent} from './caradd/caradd.component';
import {BookingService} from './services/data/booking.service';
import {BookingaddComponent} from './bookingadd/bookingadd.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: RegisterComponent},
  { path: 'user', component:RegisterComponent},
  { path: 'cars', component: CarlistComponent},
  { path: 'edituser/:id', component: RegisterComponent},
  { path: 'editcar/:targa', component: CaraddComponent},
  { path: 'addcar', component: CaraddComponent},
  { path: 'addbooking', component: BookingaddComponent},
  { path: 'editbooking/:id', component:BookingaddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
