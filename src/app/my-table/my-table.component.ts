import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform(object: any, keyName: string, ...args: unknown[]): unknown {
    if (object[keyName] instanceof Date) return object[keyName].toLocaleDateString()
    else return object[keyName];
  }

}

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

export class MyTableComponent implements OnInit, AfterViewInit {
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;
  @Input() tableConfig: MyTableConfig;
  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  filterValue: string;
  @Input() set tableData(data: any[]) {this.setTableDataSource(data);}

  constructor() {
  }

  ngOnInit(): void {
    const columnNames = this.tableConfig.headers.map((tableColumn: MyHeaders) => tableColumn.label);
    this.displayedColumns = columnNames;
    this.tableDataSource.filterPredicate = this.myFilterPredicate;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = this.filterValue.trim().toLowerCase();


  }

  sortTable(sortParameters: Sort) {
    sortParameters.active = this.tableConfig.headers.find(column => column.key === sortParameters.active).key;
    this.sort.emit(sortParameters);
  }

  myFilterPredicate = (data, filter: string): boolean => {
    if (this.tableConfig.search.columns.length != 0) {
      this.tableConfig.search.columns.forEach(columno => {
        return data[columno].toString().trim().includes(this.filterValue);
      })
    }
    else return true;
  }
}
