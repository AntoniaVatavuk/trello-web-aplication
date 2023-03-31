import { Component, Inject } from '@angular/core';
import { TrelloList } from '../shared/interfaces/trello-list';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrelloBoard } from '../shared/interfaces/trello-board';

@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.css']
})
export class AddNewListComponent {
  newList: TrelloList = {
    listId: -1,
    board: this.data,
    listName: '',
    position: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };


  constructor(
    public dialogRef: MatDialogRef<AddNewListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrelloBoard,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
