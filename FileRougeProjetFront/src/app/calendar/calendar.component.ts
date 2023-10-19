import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { MonthViewDay } from 'calendar-utils';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { SessionService } from '../service/session.service';
import { Data } from '../interface/session';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  activeDayIsOpen = false;

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  events: CalendarEvent[] = [];
  refresh = new Subject<void>();
  
  session: Data[] = []
  constructor(private sessionService: SessionService) {
    // const event1 = {
    //   title: "Cours PHP",
    //   start: new Date("2023-10-17T09:30"),
    //   end: new Date("2023-10-17T12:30"),
    //   draggable: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   }
    // }
    // this.events.push(event1);
  }

  ngOnInit() {
    this.listerSession()
   
  }

  listerSession() {
    this.sessionService.sessionAll().subscribe(
      (response: any) => {
        this.session = response.data;
        this.getEvent(this.session)
        console.log(this.session)
      }
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (isSameDay(date, this.viewDate) && this.activeDayIsOpen == true || events.length === 0) {
        this.activeDayIsOpen = false;
      }
      else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  eventClicked(event: any) {
    console.log(event);
  }
  eventTimeChanged(event: any) {
    event.event.start = event.newStart;
    event.event.end = event.newEnd;
    this.refresh.next()
  }

  getEvent(data :any[]) {
    console.log(this.session)
    
    data.forEach(element => {
      const event = {
        title: "Classe :" + element.annclasse_cour.annee_classe_id.classe.libelle + " " + element.annclasse_cour.cour.professeur.nom + " " + element.annclasse_cour.cour.professeur.prenom,
        start: new Date(`${this.formatDate(element.date)}T${this.formatTime(element.debut)}`),
        end: new Date(`${this.formatDate(element.date)}T${this.formatTime(element.fin)}`)
      }
      console.log(event);
      
      this.events.push(event);
     
      
    });
    console.log(this.events);
  }
  formatDate(date: string) {
    const date1 = new Date(date)
    return date1.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
  formatTime(time: string) {
    const length = time.length;
    return time.substring(0, length - 3)
  }

}
