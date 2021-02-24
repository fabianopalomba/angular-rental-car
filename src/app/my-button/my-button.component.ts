import {Component, Input} from '@angular/core';
import {MyTableActionEnum} from '../mytablenotmaterial/mytablenotmaterial.component';

export class MyButtonConfig {
  customCssClass;
  text: string;
  icon: string;
  type: MyTableActionEnum;
}

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})

export class MyButtonComponent {
  @Input() buttonConfig: MyButtonConfig;
}

