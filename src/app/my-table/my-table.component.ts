import {Component, Input} from '@angular/core';

export class MyTableConfig {
  headers: MyHeaders [];
  order: MyOrder;
  search: MySearch;
  pagination: MyPagination;
  actions: MyTableActionEnum[];
}

export class MyHeaders {
  key: string ;
  label: string ;
}

export class MyOrder {
  defaultColumn: string;
  orderType: string;
}

export class MySearch {
  columns: string[];
}

export class MyPagination {
  itemPerPage: number;
  itemPerPageOptions: number[];
}

export enum MyTableActionEnum {
  NEW_ROW, EDIT, DELETE
}

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})

export class MyTableComponent {
  @Input () tableConfig: MyTableConfig ;
  @Input () data: any [];
}
