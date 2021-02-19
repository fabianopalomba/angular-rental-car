import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Pipe, PipeTransform} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {MatIconModule} from '@angular/material/icon';

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
  NEW_ROW= 'NEWROW', EDIT='EDIT', DELETE='DELETE'
}

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})

export class MyTableComponent implements OnInit, AfterViewInit {
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  public filterValue: string;
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;
  @Input() tableConfig: MyTableConfig;
  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() set tableData(data: any[]) {this.setTableDataSource(data);}
  public newrow : MyTableActionEnum = MyTableActionEnum.NEW_ROW;
  dato:any;
  constructor(public dialog: MatDialog){}
  ngOnInit(){
    const columnNames = this.tableConfig.headers.map((tableColumn: MyHeaders) => tableColumn.label);
    if (this.tableConfig.actions.length > 0){
      this.displayedColumns = [...columnNames]
      for (let action of this.tableConfig.actions) {
        if (action!=this.newrow) this.displayedColumns.push(action)
      }
    }
    else this.displayedColumns = columnNames;
    this.tableDataSource.filterPredicate = this.myFilterPredicate;
    this.dato = Object.create(this.tableDataSource.filteredData[0]);
    Object.keys(this.tableDataSource.filteredData[0]).map((key)=>{
      this.dato[key] = "";
    })
    console.log(this.dato, this.tableDataSource.filteredData[0])
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
    let bool = false;
    if (this.tableConfig.search.columns.length != 0) {
      for (let columno of this.tableConfig.search.columns){
        if (data[columno].toLowerCase().includes(filter))
        bool = true;
      }
      return bool;
    }
    else return true;
  }
  emitRowAction(action:string, row: any) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:{
        dati: row,
        action: action
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rowAction.emit({data:result.data, event:result.event})
      console.log(result)
    });
  }
}
