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
  pages; rapporto;
  constructor() {}

  ngOnInit(): void {
    this.createArray(this.page, this.objectperpage)
  }

  get currentPage (){
    return this.active;
  }

  createArray(page, objectperpage){
    this.rapporto = Math.ceil(page/objectperpage);
    if (this.rapporto<1) this.rapporto = 1;
    this.pages = Array(this.rapporto).fill(0).map((x, i) => i);
  }

  onChange(value: any) {
    this.objectperpage = <number> <unknown> (value.target as HTMLInputElement).value;
    this.getobjectperpagechange.emit(this.objectperpage)
    this.createArray(this.page, this.objectperpage)
  }
}
