import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  
  role: string = ""
  attach: any;
  // ResponsablePedagogique: any;
  constructor(private navig: Router) {
    const route = inject(ActivatedRoute)
  }
  recupUser(ResponsablePedagogique: string) {
    // console.log(ResponsablePedagogique);
    alert(ResponsablePedagogique)

  }
  ngOnInit(): void {

  }

  resp() {
    // alert('sdfghjk')
    this.role = "Responsable Pedagogique"
    console.log(this.role);
    this.navig.navigateByUrl('/login')
    localStorage.setItem("role", JSON.stringify(this.role))
  }
  attache() {
    this.role = "Attache"
    console.log(this.role);
    this.navig.navigateByUrl('/login')
    localStorage.setItem("role", JSON.stringify(this.role))

  }
  profs() {
    this.role = "Professeur"
    console.log(this.role);
    this.navig.navigateByUrl('/login')
    localStorage.setItem("role", JSON.stringify(this.role))
  }
}
