import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from '../services/data/auth/signup-info';
import {AuthAppService} from '../services/data/auth/auth-app.service';
import {TokenStorageService} from '../services/data/auth/token-storage.service';
import {UserService} from '../services/data/user.service';
import {ActivatedRoute} from '@angular/router';
import {CarService} from '../services/data/car.service';
import {CarTypeService} from '../services/data/car-type.service';
import {Car, CarType} from '../services/data/car';

@Component({
  selector: 'app-caradd',
  templateUrl: './caradd.component.html',
  styleUrls: ['./caradd.component.css']
})
export class CaraddComponent implements OnInit {
  car: Car = new Car("","","","","");
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  edit : boolean = false;
  isAdmin = false;
  cartypes: CarType[];

  constructor(private authService: AuthAppService, private tokenStorageService: TokenStorageService, private userService: UserService, private activatedRoute: ActivatedRoute, private carService: CarService, private carTypeService: CarTypeService) {}

  ngOnInit() {
    if (this.tokenStorageService.getToken() != undefined) {
      this.userService.getuserbyusername(this.tokenStorageService.getUsername()).subscribe(data => {
        // @ts-ignore
        if (data.roles[0].name == "ROLE_ADMIN") {
          this.carTypeService.getcartypelist().subscribe(cartypes => {
            // @ts-ignore
            this.cartypes = cartypes;
            if (this.activatedRoute.snapshot.url[0].path == 'editcar') {
              this.carService.getcarbytarga(this.activatedRoute.snapshot.url[1].path).subscribe(car => {
                this.form = car;
                this.edit = true;
                this.isAdmin = true;
              })
            } else {
              this.form = this.car;
              this.isAdmin = true;
            }
          })
        }
      })
    }
  }

  onSubmit(){
    this.car = new Car(this.form.targa, this.form.brand, this.form.model, this.form.year, this.form.carType);
    if (!this.edit){
      this.carService.addcar(this.car).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
    else {
      this.carService.updatecar(this.car).subscribe(res => {
        window.location.reload();
      })
    }
  }
}
