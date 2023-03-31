import {Component, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrelloCard } from '../shared/interfaces/trello-card';
import { TrelloList } from '../shared/interfaces/trello-list';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.css']
})
export class AddNewCardComponent {
  newCard: TrelloCard = {
    cardId: -1,
    list: this.data,
    cardName: "",
    description: "",
    position: 0,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(
    public dialogRef: MatDialogRef<AddNewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrelloList,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

}