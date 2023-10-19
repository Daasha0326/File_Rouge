import { Component } from '@angular/core';
import { CoursService } from '../service/cours.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent {
  ngOnInit() {
    this.listeCours()
  }
  cours : any;
  constructor(private listeService: CoursService) {
  }
  listeCours() {
    this.listeService.allCours().subscribe(
      (response: any) => {
        // console.log(response);
        this.cours = response.data;
        console.log(this.cours)
      }
    );
  }
  delete(event : number) {
    console.log(event);
    this.listeService.deleteCour(event).subscribe(
      (response: any) => {
        console.log(response);
      }
    );
    this.cours = this.cours.filter((prodt:any) => prodt.id != event)
  }
}
