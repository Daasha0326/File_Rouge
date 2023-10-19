import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../interface/auth';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(data: FormGroup): Observable<Auth> {

    return this.http.post<Auth>('http://127.0.0.1:8000/api/login', data);
  }
  logOut(id: number): Observable<Auth> {
    return this.http.get<Auth>(`http://127.0.0.1:8000/api/user/${id}`)
  }
  get token() {
    return localStorage.getItem('token')
  }

  public isToken() {
    return localStorage.getItem('token') != null
  }

}
