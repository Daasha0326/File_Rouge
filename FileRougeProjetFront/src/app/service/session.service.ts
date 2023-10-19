import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service.service';
import { Data, Session } from '../interface/session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends AbstractService<Session>{

  override uri(): string {
    return 'cours';
  }
  constructor(http: HttpClient) {
    super(http);
  }
  addSession(data: Data): Observable<Data> {
    return this.http.post<Data>('http://127.0.0.1:8000/api/sessions', data)
  }
  allCours() {
    return this.http.get('http://127.0.0.1:8000/api/cours')
  }
  classeCours(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/classeCours/${id}`)
  }
  selectedClasse(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/classes/${id}`)
  }
  dispoSalle(effectifs:number){
    return this.http.get(`http://127.0.0.1:8000/api/salleDis/${effectifs}`)
  }
  allClasses(){
    return this.http.get('http://127.0.0.1:8000/api/classes')
  }
  sessionAll(){
    return this.http.get('http://127.0.0.1:8000/api/sessions')
  }
  profModule(id:number):Observable<Session>{
    return this.http.get<Session>(`http://127.0.0.1:8000/api/professeurs/${id}/sessions`)
  }
  allDemande(){
    return this.http.get('http://127.0.0.1:8000/api/demandes')
  }
  updateDem(id:number, etat: string){
    return this.http.put(`http://127.0.0.1:8000/api/demandes/${id}`, {etat})
  }
  addFile(data:any){
    return this.http.post('http://127.0.0.1:8000/api/users/import',data)
  }
}
