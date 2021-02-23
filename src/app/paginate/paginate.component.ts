import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {
  @Input() page: number;
  @Input() objectperpage: number;
  @Input() options;
  @Output() getobjectperpagechange = new EventEmitter();
  active = 0;
  pages
  constructor() {}

  ngOnInit(): void {
    this.pages = Array(this.page/this.objectperpage).fill(0).map((x, i) => i);
    // @ts-ignore
    for (let a of this.options){
      if (this.page/a<1){
        this.options.pop(a);
      }
    }
  }

  get currentPage (){
    return this.active;
  }

  onChange(value: any) {
    this.objectperpage = <number> <unknown> (value.target as HTMLInputElement).value;
    this.getobjectperpagechange.emit(this.objectperpage)
    this.pages = Array(this.page/this.objectperpage).fill(0).map((x,i)=>i);
  }
}
