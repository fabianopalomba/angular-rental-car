import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getbookinglist(){
    return this.http.get(`http://localhost:8080/api/getbookinglist`)
  }

  getbookingbyid(id){
    return this.http.get(`http://localhost:8080/api/getbookingbyid/${id}`)
  }

  approvebooking(booking){
    return this.http.put(`http://localhost:8080/api/approvebooking`, booking)
  }

  addbooking(booking){
    return this.http.post(`http://localhost:8080/api/addbooking`, booking)
  }

  getbookinglistbycar(targa){
    return this.http.get(`http://localhost:8080/api/getbookinglistbycar/${targa}`)
  }

  getbookinglistbyuser(id){
    return this.http.get(`http://localhost:8080/api/getbookinglistbyuser/${id}`)
  }

  editbooking(booking){
    return this.http.put(`http://localhost:8080/api/editbooking`, booking)
  }

  deletebookingbyid(id){
    return this.http.delete(`http://localhost:8080/api/deletebookingbyid/${id}`)
  }

  getcarsbydates(initialdate, finaldate){
    return this.http.post(`http://localhost:8080/api/getcarsbydates`, [initialdate, finaldate])
  }

  getcarsforedit(booking){
    return this.http.post(`http://localhost:8080/api/getcarsforedit`,booking)
  }
}
