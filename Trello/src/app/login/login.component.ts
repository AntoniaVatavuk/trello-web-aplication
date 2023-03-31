import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { TrelloUser } from '../shared/interfaces/trello-user';
import { TrelloUserService } from '../shared/services/trello-user.service';
import * as sha from 'sha.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  user!: Observable<TrelloUser>;

  constructor(private trelloUserService: TrelloUserService, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required])
    });
  }

  checkUser(email: string, password: string): void {
    this.user = this.trelloUserService.checkUser(email, sha('sha256').update(password).digest('hex'));
    this.user.subscribe((user: TrelloUser) => {
      this.appService.saveDataToLocalStorage("loggedUserId", user.userId.toString());
      this.router.navigateByUrl('/home');
    });
  }

  createUser(user: TrelloUser): void {
    this.user = this.trelloUserService.createUser(user);
    this.user.subscribe((user: TrelloUser) => {
      this.appService.saveDataToLocalStorage("loggedUserId", user.userId.toString());
      this.router.navigateByUrl('/home');
    });
  }

  onLoginSubmit( ) {
    this.checkUser(this.loginForm.value.email, this.loginForm.value.password);
  }

  onRegisterSubmit( ) {
    const newUser: TrelloUser = {
      "userId": 0,
      "username": this.registerForm.value.email,
      "email": this.registerForm.value.email,
      "password": sha('sha256').update(this.registerForm.value.password).digest('hex'),
      "fullName": this.registerForm.value.fullName,
      "createdAt":  new Date(),
      "updatedAt":  new Date()
    };
    this.createUser(newUser);
  }

}
