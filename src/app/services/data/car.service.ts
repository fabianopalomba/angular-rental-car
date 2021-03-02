import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  addcar(car){
    return this.http.post(`http://localhost:8080/api/addcar`, car)
  }

  updatecar(car){
    return this.http.put(`http://localhost:8080/api/updatecar`, car)
  }

  deletecarbytarga(targa){
    return this.http.delete(`http://localhost:8080/api/deletecarbytarga/${targa}`)
  }

  getcarlist(){
    return this.http.get(`http://localhost:8080/api/getcarlist`)
  }

  getcarbytarga(targa){
    return this.http.get(`http://localhost:8080/api/getcarbytarga/${targa}`)
  }
}
