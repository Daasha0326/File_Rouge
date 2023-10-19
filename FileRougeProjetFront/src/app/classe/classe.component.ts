import { Component } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Classe } from '../interface/cours';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent {

  classe!: Classe;
  ngOnInit() {
    this.listeCours()
  }
  classes!: Classe | any;
  selectClasse!: Classe
  openModal: boolean = false
  excelData: any
  constructor(private listeService: SessionService) {
  }
  modal(classe: Classe) {
    // this.openModal = !this.openModal
    this.openModal = true;
    this.selectClasse = classe;
    console.log(classe);

  }
  closeModal() {
    this.openModal = false;
  }

  listeCours() {
    this.listeService.allClasses().subscribe(
      (response: any) => {
        // console.log(response);
        this.classes = response;
        console.log(this.classes)
      }
    );
  }

  // importFiles(event: any) {
  //   const files = event.target.files[0];
  //   let fileReader = new FileReader();
  //   fileReader.readAsBinaryString(files);

  //   fileReader.onload = (e) => {
  //     let workbook = XLSX.read(fileReader.result, { type: 'binary' })
  //     let sheetNames = workbook.SheetNames;
  //     this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
  //     this.doc = {
  //       doc: this.excelData
  //     }
  //     //  console.log(this.doc);
  //     //  console.log(this.excelData);
  //   }
  // }
  // uploadFile() {
  //   console.log(this.doc);
  //   if (this.doc) {
  //     this.service.create(this.doc).subscribe(
  //       response => {
  //         console.log('Fichier envoyé avec succès !', response);
  //         // Faites quelque chose avec la réponse du serveur si nécessaire
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'envoi du fichier :', error);
  //         // Gérez les erreurs d'envoi du fichier ici
  //       }
  //     );
  //   } else {
  //     console.error('Aucun fichier à envoyer !');  // {
  //       //   path : "prof",component:ProfesseurComponent,
  //       // },
  //   }
  // }
  // delete(event: number) {
  //   console.log(event);
  //   this.listeService.deleteCour(event).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //     }
  //   );
  //   this.cours = this.cours.filter((prodt: any) => prodt.id != event)
  // }
}
