import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrelloBoard } from '../shared/interfaces/trello-board';
import { TrelloUser } from '../shared/interfaces/trello-user';

@Component({
  selector: 'app-add-new-board',
  templateUrl: './add-new-board.component.html',
  styleUrls: ['./add-new-board.component.css']
})
export class AddNewBoardComponent {
  newBoard: TrelloBoard = {
    boardId: -1,
    user: this.data,
    boardName: '',
    createdAt: new Date(),
  };

  constructor(
    public dialogRef: MatDialogRef<AddNewBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrelloUser,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
