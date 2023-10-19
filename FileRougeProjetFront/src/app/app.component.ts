import { Component, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FileRougeProjetFront';
  constructor(public navig: Router) {
    // const route = inject(ActivatedRoute)
  }
  ngOnInit(): void {
    initFlowbite();
  }
}
