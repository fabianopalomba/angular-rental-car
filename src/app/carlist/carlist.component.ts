import { Component, OnInit } from '@angular/core';
import {
  MyAction,
  MyHeaders,
  MyOrder,
  MyPagination,
  MySearch,
  MyTableActionEnum,
  MyTableConfig
} from '../mytablenotmaterial/mytablenotmaterial.component';
import {TokenStorageService} from '../services/data/auth/token-storage.service';
import {CarService} from '../services/data/car.service';
import {CarTypeService} from '../services/data/car-type.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit {
  btnnewrow: MyAction = { button: {
      customCssClass: null,
      text: null,
      icon : 'add' },
    action: MyTableActionEnum.NEW_ROW
  }
  btnedit: MyAction = { button: {
      customCssClass: null,
      text: 'edit',
      icon : null },
    action: MyTableActionEnum.EDIT
  }
  btndelete: MyAction = { button: {
      customCssClass: null,
      text: null,
      icon : 'delete' },
    action: MyTableActionEnum.DELETE
  }

  headers: MyHeaders[] = [ new MyHeaders("targa", "Targa"), new MyHeaders("brand", "Brand"), new MyHeaders("model", "Modello"),
    new MyHeaders("year", "Anno"), new MyHeaders("carType", "Tipo di Auto")]

  order: MyOrder = {
    'defaultColumn' : 'targa',
    'orderType' : 'asc'
  }
  search: MySearch = {
    'columns' : ['targa', 'brand', 'model']
  }
  pagination: MyPagination = {
    'itemPerPage' : 5,
    'itemPerPageOptions' : [5,10,15]
  }
  tableConfig: MyTableConfig = {
    'headers': this.headers,
    'order': this.order,
    'search': this.search,
    'pagination': this.pagination,
    'actions': []
  }
  data; charged: boolean = false; isAdmin = false;

  constructor(private tokenStorageService: TokenStorageService, private carService: CarService, private carTypeService: CarTypeService, private router: Router) {
    if (this.tokenStorageService.getAuthorities().includes("ROLE_ADMIN")){
      this.isAdmin = true;
      this.tableConfig.actions.push(this.btnnewrow, this.btnedit, this.btndelete);
    }
  }

  ngOnInit() {
    this.carService.getcarlist().subscribe(res=>{
      // @ts-ignore
      for (let a of res) {
        // @ts-ignore
        res[res.indexOf(a)].carType = res[res.indexOf(a)].carType.carTypeName
      }
        this.data = res;
        this.charged = true;
    })
  }
  actionfromtable(result) {
    if (this.isAdmin == true) {
      if (result.action == 'ADD') {
        this.router.navigateByUrl("addcar");
      }
      if (result.action == 'EDIT') {
        this.router.navigateByUrl("editcar/" + result.row.targa);
      }
      if (result.action == 'DELETE') {
        if (!(confirm('Sei sicuro di eliinare questa macchina?'))) {
          return false
        } else {
          this.carService.deletecarbytarga(result.row.targa).subscribe(res => window.location.reload());
        }
      }
    }
  }
}
