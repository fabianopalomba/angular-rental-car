import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getuserlist(){
    return this.http.get(`http://localhost:8080/api/getuserlist`)
  }

  deleteuserbyid(id){
    return this.http.delete(`http://localhost:8080/api/deleteuserbyid/${id}`)
  }

  getuserbyid(id){
    return this.http.get(`http://localhost:8080/api/getuserbyid/${id}`)
  }

  getuserbyusername(username){
    return this.http.get(`http://localhost:8080/api/getuserbyusername/${username}`)
  }

  edituser(user){
    return this.http.put(`http://localhost:8080/api/edituser`, user)
  }

  makeadmin(username){
    return this.http.put(`http://localhost:8080/api/makeadmin`, username)
  }

  checkTokenUsername(token) {
    return this.http.post('http://localhost:8080/api/validatetoken',token, {responseType:'text'});
  }
}
