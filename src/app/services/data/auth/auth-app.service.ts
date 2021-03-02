import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthAppService {

  constructor(private httpClient: HttpClient) {
  }

  attemptAuth(username, password): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`http://localhost:8080/api/signin/${username}`, password, httpOptions);
  }

  signUp(user) {
    return this.httpClient.post(`http://localhost:8080/api/signup`, user, httpOptions);
  }
}
