import {Component, Input} from '@angular/core';

export class MyButtonConfig {
  customCssClass: string;
  text: string;
  icon: string;
}

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})

export class MyButtonComponent {
  @Input() buttonConfig: MyButtonConfig;
}

