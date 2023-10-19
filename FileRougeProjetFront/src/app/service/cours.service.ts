import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Cours } from '../interface/cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService extends AbstractService<Cours> {
  override uri(): string {
    return 'cours';
  }

  // constructor(http: HttpClient) {
  //   super(http);
  // }
  constructor(http: HttpClient) {
    super(http);
  }

  addCours(data: Cours): Observable<Cours> {
    return this.http.post<Cours>('http://127.0.0.1:8000/api/cours', data)
  }
  allSelect() {
    return this.http.get('http://127.0.0.1:8000/api/coursAll')
  }
  moduleUser(id: number, idSem: number) {
    return this.http.get(`http://127.0.0.1:8000/api/cours/${id}/semestre/${idSem}`)
  }
  deleteCour(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/cours/${id}`)
  }
  allCours(){
    return this.http.get('http://127.0.0.1:8000/api/cours')
  }
}
