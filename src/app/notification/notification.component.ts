import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {MyButtonConfig} from '../my-button/my-button.component';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  host: {'[class.ngb-toasts]': 'true'}
})
export class NotificationComponent{

  @Input() title: string;
  @Input() text: string;
  @Input() duration: number = 4000;
  @Input() config: MyButtonConfig;
  @Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();
  show = false;
  boolean: boolean;

  constructor() { }

  open(){
    this.show = true;
    setTimeout(()=> this.show = false, this.duration);
  }

  close() {
    this.show = false;
    this.boolean = false;
    this.answer.emit(false);
  }

  confirm() {
    this.show = false;
    this.boolean = true;
    this.answer.emit(true);
  }
}
