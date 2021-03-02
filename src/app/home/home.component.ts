import {Component, OnInit} from '@angular/core';
import {MyButtonConfig} from '../my-button/my-button.component';
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
import {UserService} from '../services/data/user.service';
import {User} from '../services/data/auth/user';
import {BookingService} from '../services/data/booking.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  btnapprove: MyAction = { button: {
      customCssClass: null,
      text: 'approve/not',
      icon : null },
    action: MyTableActionEnum.EDIT
  }
  btndelete: MyAction = { button: {
    customCssClass: null,
    text: null,
    icon : 'delete' },
    action: MyTableActionEnum.DELETE
  }

  headersusers: MyHeaders[] = [ new MyHeaders("id", "Id"), new MyHeaders("name", "Nome"), new MyHeaders("surname", "Cognome"),
                          new MyHeaders("username", "Username"), new MyHeaders("birthday", "Data di nascita")]

  headersbookings: MyHeaders[] = [ new MyHeaders("id", "id"), new MyHeaders("car", "Auto"), new MyHeaders("user", "User"),
    new MyHeaders("initialDate", "Data Iniziale"), new MyHeaders("finalDate", "Data Finale"), new MyHeaders("approved", "Approvato")]

  headersbookingsuser: MyHeaders[] = [ new MyHeaders("id", "id"), new MyHeaders("brand", "Auto"),new MyHeaders("model", "Modello"),
    new MyHeaders("initialDate", "Data Iniziale"), new MyHeaders("finalDate", "Data Finale"), new MyHeaders("approved", "Approvato")]

  order: MyOrder = {
    'defaultColumn' : 'id',
    'orderType' : 'asc'
  }
  search: MySearch = {
    'columns' : ['surname', 'name', 'username']
  }
  searchbooking: MySearch = {
    'columns' : ["id", "car","user","initialDate","finalDate"]
  }

  searchbookinguser: MySearch = {
    'columns' : ["id", "brand","model","initialDate","finalDate"]
  }

  pagination: MyPagination = {
    'itemPerPage' : 2,
    'itemPerPageOptions' : [1,2,3]
  }
  tableConfigusers: MyTableConfig = {
    'headers': this.headersusers,
    'order': this.order,
    'search': this.search,
    'pagination': this.pagination,
    'actions': [this.btnnewrow,this.btnedit,this.btndelete]
  }
  tableConfigbookings: MyTableConfig = {
    'headers': this.headersbookings,
    'order': this.order,
    'search': this.searchbooking,
    'pagination': this.pagination,
    'actions': [this.btnapprove]
  }

  tableConfiguserbookings: MyTableConfig = {
    'headers': this.headersbookingsuser,
    'order': this.order,
    'search': this.searchbookinguser,
    'pagination': this.pagination,
    'actions': [this.btnnewrow, this.btnedit, this.btndelete]
  }

  constructor(private tokenStorageService:TokenStorageService, private userService:UserService, private bookingService:BookingService, private router:Router) { }

  isLoggedIn = false; isAdmin = false; usersdata; bookingsdata; action; bookingsuser; isCustomer=false;

  ngOnInit() {
    if(this.tokenStorageService.getToken() != undefined) {
        this.userService.getuserbyusername(this.tokenStorageService.getUsername()).subscribe(data => {
          this.isLoggedIn = true;
          // @ts-ignore
          if (data.roles[0].name == "ROLE_ADMIN" ) {
            this.userService.getuserlist().subscribe(users=>{
              this.bookingService.getbookinglist().subscribe(bookings=>{
                // @ts-ignore
                for (let a of bookings) {
                  // @ts-ignore
                  bookings[bookings.indexOf(a)].car = bookings[bookings.indexOf(a)].car.targa
                  // @ts-ignore
                  bookings[bookings.indexOf(a)].user = bookings[bookings.indexOf(a)].user.username
                }
                this.usersdata = users;
                this.bookingsdata = bookings;
                this.isAdmin = true;
              })
            })
          }
          else {
            // @ts-ignore
            this.bookingService.getbookinglistbyuser(data.id).subscribe(res=>{
              // @ts-ignore
              for (let a of res) {
                // @ts-ignore
                res[res.indexOf(a)].brand = res[res.indexOf(a)].car.brand
                // @ts-ignore
                res[res.indexOf(a)].model = res[res.indexOf(a)].car.model
                // @ts-ignore
                res[res.indexOf(a)].user = res[res.indexOf(a)].user.username
              }
              this.bookingsuser = res;
              this.isCustomer = true;
            })
          }
        })
      }
    }

    actionfromtable(result){
    if (result.action == "ADD"){
      this.router.navigateByUrl("signup");
    }
      if (result.action == 'EDIT' && result.row.approved!= undefined && this.isAdmin==true){
        result.row.approved = !result.row.approved;
        this.bookingService.editbooking(result.row).subscribe(res=>{
          window.location.reload();
        })}
      if (result.action == 'EDIT' && result.row.approved!= undefined && this.isCustomer==true){
        let now = new Date();
        now.setDate( now.getDate() + 2);
        let initialdate = new Date(result.row.initialDate);
        // @ts-ignore
        let difference = (now.getTime() - initialdate.getTime())/(1000*60*60*24);
        if (difference < 2 && difference > 0){
          alert("Non puoi modificare una prenotazione che inizia tra meno di due giorni")
        }
        else this.router.navigateByUrl("editbooking/" + result.row.id);
      }
      if (result.action=="EDIT" && result.row.birthday!= undefined){
        this.router.navigateByUrl("edituser/"+result.row.id);
      }
        if (result.action == "DELETE" && result.row.birthday!= undefined){
        if(!(confirm('Sei sicuro di eliminare il tuo account?'))){
          return false
        }
        else {
          this.userService.deleteuserbyid(result.row.id).subscribe(res=>window.location.reload());
        }
      }
      if (result.action == "DELETE" && result.row.approved!= undefined){
          let now = new Date();
          now.setDate( now.getDate() + 2);
          let initialdate = new Date(result.row.initialDate);
          // @ts-ignore
          let difference = (now.getTime() - initialdate.getTime())/(1000*60*60*24);
          if (difference < 2 && difference > 0){
            alert("Non puoi eliminare una prenotazione che inizia tra meno di due giorni")
          }
          else {
            if(!(confirm('Sei sicuro di eliminare la prenotazione numero '+result.row.id + '?'))){
              return false
            }
            else this.bookingService.deletebookingbyid(result.row.id).subscribe(res=>window.location.reload());
          }
        }
    }
}
