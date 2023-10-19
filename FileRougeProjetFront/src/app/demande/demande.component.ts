import { Component } from '@angular/core';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent {
  idProf: any;
  demandes: any;
  constructor(private listeService: SessionService) {
  }

  ngOnInit() {
    this.listeService.allDemande().subscribe((res: any) => {
      // console.log(res);
      this.demandes = res.data
      // console.log(this.demandes);
    });
  }
  update(dem:any){
    console.log(dem);
    const recupEtat = {
      etat : 'refusee'
    }
    this.listeService.updateDem(dem.id,"autorisee").subscribe((res: any)=>{
      console.log(res);
    })
    this.demandes = this.demandes.filter((demande: any) => demande.id !== dem.id);
  }
  refuser(dem:any){
    console.log(dem);
    // const recupEtat = {
    //   etat : 'refusee'
    // }
    this.listeService.updateDem(dem.id,"refusee").subscribe((res: any)=>{
      console.log(res);
    })
    this.demandes = this.demandes.filter((demande: any) => demande.id !== dem.id);
  }
}
