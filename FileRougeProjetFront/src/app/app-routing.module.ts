import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { PlanningComponent } from './planning/planning.component';
import { PlanncoursComponent } from './planncours/planncours.component';
import { CoursComponent } from './cours/cours.component';
import { ClasseComponent } from './classe/classe.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ListecoursComponent } from './listecours/listecours.component';
import { DemandeComponent } from './demande/demande.component';
// import { ListecoursComponent } from './listecours/listecours.component';

const routes: Routes = [
  { path: "", component: AccueilComponent },
  { path: "login", component: LoginComponent },
  { path: "planning", component: PlanningComponent },
  { path: "cours", component: CoursComponent },
  { path: "plancours", component: PlanncoursComponent },
  { path: "classe", component: ClasseComponent },
  { path: "planSession", component: CalendarComponent },
  { path: "listeCour", component: ListecoursComponent },
  { path: "demande", component: DemandeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
