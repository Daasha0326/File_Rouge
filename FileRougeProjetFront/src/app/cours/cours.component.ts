import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursService } from '../service/cours.service';
import { Classe, Classe2, Module, Professeur, Semestre } from '../interface/cours';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  myForm!: FormGroup;
  modules!: any
  semestres!: any
  professeurs!: any

  idModuleSelected !: number
  idSemestreSelected !: number
  profs: any[] = []

  classes!: any
  constructor(private fb: FormBuilder, private ajoutService: CoursService) {
    this.myForm = this.fb.group({
      user_id: [""],
      module_id: [""],
      classes: [""],
      semestre_id: [""],
      HeureGlobal: [""],
    })
  }
  ngOnInit() {
    this.ajoutService.allSelect().subscribe((res: any) => {
      console.log(res);
      this.modules = res.module
      this.semestres = res.semestre
      this.professeurs = res.professeur
      this.classes = res.classe
    })
  }

  onSelected(event: Event) {
    const element = event.target as HTMLSelectElement
    this.idModuleSelected = +element.value
    console.log(this.idModuleSelected);
    this.ajoutService.moduleUser(+element.value, this.idSemestreSelected).subscribe((response: any) => {
      console.log(response.data);
      this.profs = response.data
    })
  }

  onSemestre(event: Event) {
    const element = event.target as HTMLSelectElement
    this.idSemestreSelected = +element.value
    console.log(this.idSemestreSelected);
    console.log(this.idModuleSelected);


  }
  
  addProd() {

    const data = this.myForm.value;
    console.log(data);
    this.ajoutService.addCours(data).subscribe(res => {
      console.log(res);
    })

  }




}
