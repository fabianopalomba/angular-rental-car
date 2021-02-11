import { Component } from '@angular/core';
import {MyButtonComponent} from './my-button/my-button.component';
import construct = Reflect.construct;
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-rental-car';
}
