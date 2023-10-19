import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  FormLogin!: FormGroup;

  role: any
  motif : any

  constructor(private fb: FormBuilder, private auth: AuthService, private navig: Router) {
    const route = inject(ActivatedRoute)
    this.FormLogin = fb.group({
      email: [''],
      password: ['']
    })
    route.paramMap.subscribe(param => {
      const role = param.get('role');
      if (role) {
        // console.log(role);
      }
    })

  }
  login() {
    this.auth.login(this.FormLogin.value).subscribe((res) => {
      console.log(res);
      localStorage.setItem("token", JSON.stringify(res.token))
      localStorage.setItem("user", JSON.stringify(res.user))
      localStorage.setItem("notification", JSON.stringify(res.notification))
      const store = localStorage.getItem("role")

      if (store) {
        const diams = JSON.parse(store)
        if (diams == res.user.role && diams == 'Responsable Pedagogique') {
          this.navig.navigateByUrl('/planning')
        }
        if (diams == res.user.role && diams == 'Professeur') {
          this.navig.navigateByUrl('/listeCour')
        }
        if (diams == res.user.role && diams == 'Attache') {
          this.navig.navigateByUrl('/demande')
        }
      }
      
    })
  }
}
