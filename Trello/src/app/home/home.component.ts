import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import {MatButtonModule} from '@angular/material/button';
import { TrelloBoard } from '../shared/interfaces/trello-board';
import { TrelloBoardService } from '../shared/services/trello-board.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedUserId: string | null;
  boards$!: Observable<TrelloBoard[]>;

  constructor(
    private appService: AppService,
    private router: Router,
    private trelloBoardService: TrelloBoardService
    ) {
      this.loggedUserId = this.appService.getDataToLocalStorage("loggedUserId");
      console.log(this.loggedUserId);
  }

  logOut(){
    this.appService.removeDataToLocalStorage("loggedUserId");
    this.router.navigateByUrl('/login');
  }

  getAllBoardsFromUser(){
    this.boards$ = this.trelloBoardService.getBoardsByUserId(Number(this.loggedUserId));
    // this.boards.subscribe(boards => console.log(boards));
  }
  
  selectBoard(){

  }

  ngOnInit(): void {
    this.getAllBoardsFromUser();
  }

}
