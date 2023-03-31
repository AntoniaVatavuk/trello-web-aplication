import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppService } from '../app.service';
import { TrelloBoard } from '../shared/interfaces/trello-board';
import { TrelloBoardService } from '../shared/services/trello-board.service';
import { TrelloUserService } from '../shared/services/trello-user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewBoardComponent } from '../add-new-board/add-new-board.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  @Output() selectedBoardEvent = new EventEmitter<TrelloBoard>();
  
  loggedUserId!: string | null;
  boards$!: Observable<TrelloBoard[]>;

  constructor(
    private appService: AppService,
    private trelloBoardService: TrelloBoardService,
    private trelloUserService: TrelloUserService,
    public dialog: MatDialog
    ) {
      this.loggedUserId = this.appService.getDataToLocalStorage("loggedUserId");
  }

  getAllBoardsFromUser(){
    this.boards$ = this.trelloBoardService.getBoardsByUserId(Number(this.loggedUserId));
  }

  ngOnInit(): void {
    this.getAllBoardsFromUser();
  }

  selectBoard(board: TrelloBoard){
    this.selectedBoardEvent.emit(board);
  }

  // Adds new board
  openAddNewBoardDialog(){
    if(this.loggedUserId){
      const userId: number = Number(this.loggedUserId);
      this.trelloUserService.getUserById(userId).subscribe( user => {
        const newBoardDialogRef = this.dialog.open(AddNewBoardComponent, {
          data: user,
        });

        newBoardDialogRef.afterClosed().subscribe((result: TrelloBoard) => {
          this.trelloBoardService.createBoard(result, userId)
          .pipe(
            map(() => {
              this.boards$ = this.boards$.pipe(
                map((boards: TrelloBoard[]) => [...boards]),
              );
            })
          ).subscribe();
        });
      });
      }
  }

  // Sort boards by name ascending at first click, later clicks sort ascending / descending
  sortBoards(){}

  // Edit board name from board menu
  editBoard(){
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
