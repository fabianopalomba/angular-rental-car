import {Component, OnInit} from '@angular/core';
import {MyButtonConfig} from '../my-button/my-button.component';
import {
  MyHeaders,
  MyOrder,
  MyPagination,
  MySearch,
  MyTableActionEnum,
  MyTableConfig
} from '../mytablenotmaterial/mytablenotmaterial.component';

export class User {
  constructor(name: string, surname: string, username: string, birthday: Date, id: number) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.birthday = birthday;
    this.id = id;
  }
  name: string;
  surname: string;
  username: string;
  birthday: Date;
  id: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textBtnConfig: MyButtonConfig = {
    'customCssClass': "width: '150px',height: '60px',backgroundColor: '#f92672'",
    'text': 'Click here',
    'icon' : null
  }

  data: User[] = [new User("fab", "palo", "fegh", new Date(1995, 3,6),3), new User("gab", "balo", "legh", new Date(1995,4,7), 2)];

  headers: MyHeaders[] = [new MyHeaders("name", "name"), new MyHeaders("surname", "surname"),
                          new MyHeaders("username", "username"), new MyHeaders("birthday", "birthday"), new MyHeaders("id", "id")]

  order: MyOrder = {
    'defaultColumn' : 'id',
    'orderType' : 'desc'
  }
  search: MySearch = {
    'columns' : ['surname', 'name']
  }
  pagination: MyPagination = {
    'itemPerPage' : 1,
    'itemPerPageOptions' : [1,2,3]
  }
  tableConfig: MyTableConfig = {
    'headers': this.headers,
    'order': this.order,
    'search': this.search,
    'pagination': this.pagination,
    'actions': [MyTableActionEnum.NEW_ROW, MyTableActionEnum.EDIT, MyTableActionEnum.DELETE],
  }

  constructor() { }

  ngOnInit() {
  }

}
