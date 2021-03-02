import { Component, OnInit } from '@angular/core';
import {AuthAppService} from '../services/data/auth/auth-app.service';
import {UserService} from '../services/data/user.service';
import {TokenStorageService} from '../services/data/auth/token-storage.service';
import {SignUpInfo} from '../services/data/auth/signup-info';
import {ActivatedRoute} from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {User} from '../services/data/auth/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupInfo: SignUpInfo;
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  edit : boolean = false;
  logged = false;

  constructor(private authService: AuthAppService, private tokenStorageService: TokenStorageService, private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.tokenStorageService.getToken()!=null) {
      if (this.activatedRoute.snapshot.url[0].path == 'user') {
        this.userService.checkTokenUsername(this.tokenStorageService.getToken()).subscribe(res => {
          if (res == this.tokenStorageService.getUsername()) {
            this.userService.getuserbyusername(this.tokenStorageService.getUsername()).subscribe(data => {
              this.edit = true;
              this.form = data;
              this.logged = true;
            })
          }
        })
      }
      if (this.activatedRoute.snapshot.url[0].path == 'edituser'){
        if (this.tokenStorageService.getAuthorities().includes("ROLE_ADMIN")){
          this.userService.getuserbyid(this.activatedRoute.snapshot.url[1].path).subscribe(res=>{
            this.form = res;
            this.edit = true;
            this.logged = true;
          })
        }
      }
      this.logged = true;
    }
  }

  onSubmit() {
    this.signupInfo = new SignUpInfo(this.form.name, this.form.surname, this.form.username, this.form.password, this.form.birthday);
    if (!this.edit){
      this.authService.signUp(this.signupInfo).subscribe(
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
      this.userService.edituser(this.signupInfo).subscribe(res => {
        window.location.reload();
      })
    }
  }
}
