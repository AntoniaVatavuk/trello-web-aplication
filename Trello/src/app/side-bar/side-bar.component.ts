import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AppService } from '../app.service';
import { TrelloBoard } from '../shared/interfaces/trello-board';
import { TrelloBoardService } from '../shared/services/trello-board.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

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

  getAllBoardsFromUser(){
    this.boards$ = this.trelloBoardService.getBoardsByUserId(Number(this.loggedUserId));
    // this.boards.subscribe(boards => console.log(boards));
  }

  ngOnInit(): void {
    this.getAllBoardsFromUser();
  }

  selectBoard(board: TrelloBoard){

  }

  editBoard(){

  }

  deleteBoard(boardId: number){
    this.trelloBoardService.deleteBoard(boardId).subscribe(() => {
      // After the board is deleted, update the boards$ Observable to remove the deleted board
      this.boards$ = this.boards$.pipe(
        map(boards => boards.filter(board => board.boardId !== boardId))
      );
    });
  }

}
