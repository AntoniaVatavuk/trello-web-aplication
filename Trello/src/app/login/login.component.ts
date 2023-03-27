import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { TrelloUser } from '../shared/interfaces/trello-user';
import { TrelloUserService } from '../shared/services/trello-user.service';

import {MatFormFieldModule} from '@angular/material/form-field';


import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  user!: Observable<TrelloUser>;

  constructor(private trelloUserService: TrelloUserService, private appService: AppService, private router: Router) {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required])
    // });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  checkUser(email: string, password: string): void {
    this.user = this.trelloUserService.checkUser(email, password);
    this.user.subscribe((user: TrelloUser) => {
      console.log("correct user");
      console.log(user.username);
      this.appService.saveDataToLocalStorage("loggedUserId", user.userId.toString());
      this.router.navigateByUrl('/home');
    });
    // console.log(this.loginForm.value);
  }

  onSubmit( ) {
    console.log(this.loginForm.value);
    this.checkUser(this.loginForm.value.email, this.loginForm.value.password);
  }



  // credentials = {username: '', password: ''};

  // constructor(private app: AppService, private http: HttpClient, private router: Router) {
  // }

  // login() {
  //   // this.app.authenticate(this.credentials, () => {
  //   //     this.router.navigateByUrl('/');
  //   // });
  //   // return false;
  // }


// get user from backend
  // user!: Observable<TrelloUser>;
  // constructor(private trelloUserService: TrelloUserService) {}
  // getUser(): void {
  //   this.user = this.trelloUserService.getUserById(1);
  // }
  // ngOnInit(): void {
  //   this.user = this.trelloUserService.getUserById(1);
  //   // this.getUser();
  // }
}
