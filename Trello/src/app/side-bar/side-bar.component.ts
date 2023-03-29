import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppService } from '../app.service';
import { TrelloBoard } from '../shared/interfaces/trello-board';
import { TrelloBoardService } from '../shared/services/trello-board.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  @Output() selectedBoardEvent = new EventEmitter<TrelloBoard>();
  
  loggedUserId: string | null;
  boards$!: Observable<TrelloBoard[]>;

  constructor(
    private appService: AppService,
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

  ngOnChange(changes: SimpleChanges) {
    if (changes['board.boardName']) {
      // this.editBoard(board.boardName);
      // this.trelloBoardService.updateBoard(id, board);
    }
  }

  selectBoard(board: TrelloBoard){
    this.selectedBoardEvent.emit(board);
  }

  // Adds new board
  addNewBoard(){

  }

  // Sort boards by name ascending at first click, later clicks sort ascending / descending
  sortBoards(){}

  // Edit board name from board menu
  editBoard(){
  // editBoard(newBoardName: string){
    // this.trelloBoardService.getBoard
    // const board: TrelloBoard = this.boards$.pipe(
    //   map(boards => boards.filter(board => board.boardName === newBoardName))
    // );

    // const board: TrelloBoard = {
    //   name: 'My Category',
    //   description: 'My Description',
    // };

    // this.trelloBoardService.updateBoard();
  }

  // Delete board from board menu
  deleteBoard(boardId: number){
    this.trelloBoardService.deleteBoard(boardId).subscribe(() => {
      // After the board is deleted, update the boards$ Observable to remove the deleted board
      this.boards$ = this.boards$.pipe(
        map(boards => boards.filter(board => board.boardId !== boardId))
      );
    });
  }

}
