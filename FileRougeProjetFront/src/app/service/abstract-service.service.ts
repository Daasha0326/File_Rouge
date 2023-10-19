import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export abstract class AbstractService<T>{

  constructor(public http: HttpClient) { }

  abstract uri():string;

  all():Observable<T>{
    const URI= this.uri()
    return this.http.get<T>(`http://127.0.0.1:8000/api/${URI}`)
  }

  supprimer(id:number):Observable<T>{
    const URI= this.uri()
    return this.http.delete<T>(`http://127.0.0.1:8000/api/${URI}`)
  }

}