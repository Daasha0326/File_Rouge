import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-planncours',
  templateUrl: './planncours.component.html',
  styleUrls: ['./planncours.component.css']
})
export class PlanncoursComponent {
  formSession!: FormGroup;
  cours: any;
  classes: any;
  idClasseSelected!: number;
  effectifs: number = 0
  place: any;

  constructor(private fb: FormBuilder, private sessionService: SessionService) {
    this.formSession = this.fb.group({
      date: [""],
      debut: [""],
      fin: [""],
      etat: [""],
      salle_id: [""],
      cour_id: [""],
      classe_id: [""]
    })

    this.formSession.get('classe_id')?.valueChanges.subscribe(res => {
      //console.log(res);
      res.forEach((element: any) => {
        this.sessionService.selectedClasse(element).subscribe((res: any) => {
          //console.log(res);
          this.effectifs += +res.effectif
          // console.log(this.effectifs);
          this.sessionService.dispoSalle(this.effectifs).subscribe((response: any) => {
            this.place = response


          })
        })

      });
      this.effectifs = 0
    })

  }

  ngOnInit() {
    this.sessionService.allCours().subscribe((res: any) => {
      // console.log(res.data);
      this.cours = res.data
    })

  }

  changeCours() {
    const crs = this.formSession.get('cour_id')?.value
    // console.log(crs);
    this.sessionService.classeCours(crs).subscribe((response: any) => {
      // console.log(response);
      this.classes = response
    })
  }
  addSessions() {

    const data = this.formSession.value;
    const selectedClasseId = data.classe_id;
    const selectedDate = data.date;
    const selectedDebut = data.debut;
    const selectedFin = data.fin;

    this.sessionService.dispoSalle(this.effectifs).subscribe((salleDispo: any) => {
      
    })

    // console.log(data);
    this.sessionService.addSession(data).subscribe(res => {
      // console.log(res);
    })
  }

}
