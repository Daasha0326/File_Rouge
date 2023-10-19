import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Data, Session } from '../interface/session';

@Component({
  selector: 'app-listecours',
  templateUrl: './listecours.component.html',
  styleUrls: ['./listecours.component.css']
})
export class ListecoursComponent implements OnInit {
  sessions !: any
  idProf !: number
  openModal: boolean = false;
  selectClasse!: Session
  userConnected : any;
  constructor(private listeService: SessionService) {
  }

  ngOnInit() {

    const recupId = localStorage.getItem('user');
    if (recupId) {
      const idUser = JSON.parse(recupId)
      console.log(idUser);
      this.userConnected = idUser
      this.idProf = idUser.id
      this.listeService.profModule(this.idProf).subscribe((res: any) => {
        // console.log(res);
        this.sessions = res.data
        console.log(this.sessions);

      })
    }
  }
  modal(classe: Session) {
    // this.openModal = !this.openModal
    this.openModal = true;
    this.selectClasse = classe;
    console.log(classe);

  }
  closeModal() {
    this.openModal = false;
  }

}
