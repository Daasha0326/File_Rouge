import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  userConnected: any;

  ngOnInit() {

    const recupId = localStorage.getItem('user');
    if (recupId) {
      const idUser = JSON.parse(recupId)
      console.log(idUser);
      this.userConnected = idUser
     

      
    }
  }
}
