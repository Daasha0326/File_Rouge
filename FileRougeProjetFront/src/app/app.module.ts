import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PlanningComponent } from './planning/planning.component';
import { PlanncoursComponent } from './planncours/planncours.component';
import { CoursComponent } from './cours/cours.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClasseComponent } from './classe/classe.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { registerLocaleData } from '@angular/common';
import { ListecoursComponent } from './listecours/listecours.component';
import { DemandeComponent } from './demande/demande.component';


// registerLocaleData(localeFr,'fr');

class CustomDateFormatter extends CalendarNativeDateFormatter{
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute:'numeric'}).format(date);
  }
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute:'numeric'}).format(date);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NavbarComponent,
    LoginComponent,
    PlanningComponent,
    PlanncoursComponent,
    CoursComponent,
    ClasseComponent,
    InscriptionComponent,
    CalendarComponent,
    ListecoursComponent,
    DemandeComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    {provide: CustomDateFormatter, useClass: CustomDateFormatter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
