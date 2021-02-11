import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';

export class MyTableConfig {
  headers: MyHeaders [];
  order: MyOrder;
  search: MySearch;
  pagination: MyPagination;
  actions: MyTableActionEnum[];
}

export class MyHeaders {
  constructor(key: string, label:string) {
    this.key = key;
    this.label = label;
  }
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

/*
export class MyTableComponent implements OnChanges{
  @Input() tableConfig: MyTableConfig;
  @Input() data: any [];
  keys: string[];
  alldata: any[];
  sortedDatas: any[];

  sortData(sort: Sort){
    const dates = this.data.slice();
    if (!sort.active || sort.direction === ''){
      this.sortedDatas = dates;
      return;
    }
    this.sortedDatas = dates.sort((a,b) =>{
      const isAsc = sort.direction === 'asc';
      if (sort.active){
        console.log(a, b)
        return compare(a.this.tableConfig.headers[this.tableConfig.headers.indexOf(this.tableConfig.headers.find(x=> x.key === sort.active))], b.this.tableConfig.headers[this.tableConfig.headers.indexOf(this.tableConfig.headers.find(x=> x.key === sort.active))], isAsc);
      }
    })
  }

  ngOnChanges() {
    this.sortedDatas = this.data.slice();
    this.keys = Object.keys((this.data[0]));
  }

  applyFilter(filterValue) {
    let filterValueLower = filterValue.target.value.toLowerCase();
    this.alldata = this.data;
    if (filterValue === '') {
    } else {
      for (let a of this.tableConfig.search.columns) {

      }
      this.data = this.alldata.filter((key) => {
        for (let a of this.tableConfig.search.columns) {
          key.a.includes(filterValueLower)
        }
      });
    }
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

*/
