import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/data/car.service';
import {CarType} from '../services/data/car';
import {CarTypeService} from '../services/data/car-type.service';
import {BookingService} from '../services/data/booking.service';
import {UserService} from '../services/data/user.service';
import {TokenStorageService} from '../services/data/auth/token-storage.service';
import {Booking} from '../services/data/booking';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bookingadd',
  templateUrl: './bookingadd.component.html',
  styleUrls: ['./bookingadd.component.css']
})
export class BookingaddComponent implements OnInit {
  cars; cartypes; form: any = {}; datesaved = false; carlist; edit = false;
  constructor(private carService:CarService, private carTypeService: CarTypeService, private bookingService: BookingService, private userService: UserService, private tokenStorageService: TokenStorageService, private route: ActivatedRoute) { }

  ngOnInit(){
    if (this.tokenStorageService.getToken()!=undefined){
      this.carService.getcarlist().subscribe(cars=>{
        this.cars = cars;
        this.carTypeService.getcartypelist().subscribe(cartypes=>{
          this.cartypes = cartypes;
          if (this.route.snapshot.url[0].path == 'editbooking'){
            this.bookingService.getbookingbyid(this.route.snapshot.url[1].path).subscribe(res=>{
              this.form = res;
            })
          }
        })
      })
    }
  }

  onSubmit(){
    if (this.route.snapshot.url[0].path == 'addbooking') {
      this.bookingService.getcarsbydates(this.form.initialDate, this.form.finalDate).subscribe(res => {
        this.carlist = res;
        this.datesaved = true;
      })
    }
    if (this.route.snapshot.url[0].path == 'editbooking'){
      this.bookingService.getcarsforedit(this.form).subscribe(res=>{
        this.carlist = res;
        this.datesaved = true;
      })
    }
  }

  addBooking() {
    this.userService.checkTokenUsername(this.tokenStorageService.getToken()).subscribe(res=>{
      this.userService.getuserbyusername(res).subscribe(user=>{
        this.bookingService.addbooking(new Booking(user, this.form.initialDate, this.form.finalDate, this.form.car, false)).subscribe(result=>{
          window.location.href="home";
        })
      })
    })
  }
}
