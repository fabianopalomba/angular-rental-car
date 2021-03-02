import {
  Component,
  Directive,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  EventEmitter, AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';
import {MyButtonConfig} from '../my-button/my-button.component';

export class MyTableConfig {
  headers : MyHeaders [];
  order : MyOrder ;
  search : MySearch ;
  pagination : MyPagination ;
  actions : MyAction [];
  }
export enum MyTableActionEnum {
  NEW_ROW= 'NEWROW', EDIT='EDIT', DELETE='DELETE'
}
export class MyAction{
  action : MyTableActionEnum;
  button: MyButtonConfig;
}
export class MyPagination {
  itemPerPage : number ;
  itemPerPageOptions : number [];
  }

export class MyOrder {
  defaultColumn : string ;
  orderType : string ;
  }

export class MySearch {
  columns: string [];
}

export class MyHeaders {
  key : string ;
  label : string ;

  constructor(key: string, label:string) {
    this.key = key;
    this.label = label;
  }
}
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
export interface SortEvent {
  column;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {
  @Input() sortable = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-mytablenotmaterial',
  templateUrl: './mytablenotmaterial.component.html',
  styleUrls: ['./mytablenotmaterial.component.css']
})
export class MytablenotmaterialComponent implements OnInit, AfterViewInit{
  @Input() tableConfig: MyTableConfig;
  @Input() data: any[];
  public displayedColumns: string[];
  public newrow: boolean = false;
  booleanValue: any = false;
  private filterValue: any;
  public filterData;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  perpage; dato; indexnewrow; searchcolumn;
  constructor(private cdRef: ChangeDetectorRef, public dialog: MatDialog) {}

  ngOnInit() {
    const columnNames = this.tableConfig.headers.map((tableColumn: MyHeaders) => tableColumn.label);
    if (this.tableConfig.actions.length > 0){
      this.displayedColumns = [...columnNames]
      for (let action of this.tableConfig.actions) {
        if (action.action != MyTableActionEnum.NEW_ROW) {
          this.indexnewrow = this.tableConfig.actions[this.tableConfig.actions.findIndex((item)=>item.action == MyTableActionEnum.NEW_ROW)]
          this.displayedColumns.push(action.button.text)
        }
        else {
          this.newrow = true;
        }
      }
    }
    else this.displayedColumns = columnNames;
    if (this.newrow==true) this.tableConfig.actions.splice(this.indexnewrow,1)
    this.filterData = this.data;
    this.perpage = this.tableConfig.pagination.itemPerPage;
  }

  ngAfterViewInit() {
    if(this.filterData!=undefined)
    this.onSort(<SortEvent>{column: this.tableConfig.order.defaultColumn, direction: (this.tableConfig.order.orderType)})
    this.cdRef.detectChanges();
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '' && column === '') {
    }
    else{
      this.filterData = [...this.filterData].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  convertDate(any){
    if (any instanceof Date) return any.toLocaleDateString()
    else return any;
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    if (this.filterValue == ""){
          this.filterData = this.data;
        }
        else {
          let filter = this.filterValue.trim().toLowerCase();
          this.filterData = this.data.filter(
            x=> {
              if (x[this.searchcolumn].toString().toLowerCase().includes(filter))
                return true
              else return false
              /*
              let bool = false;
              if (this.tableConfig.search.columns.length != 0) {
                for (let columno of this.tableConfig.search.columns) {
                  if (x[columno].toLowerCase().includes(filter))
                    bool = true;
                }
                return bool;
              } else return true;
*/
            })
        }
  }

  changeTable($event: any) {
    this.perpage = <number> <unknown> (event.target as HTMLInputElement).value
  }

  emitRowAction(action: string, row: any) {
      this.rowAction.emit({/*data: result.data, event: result.event*/action, row})
  }
}
