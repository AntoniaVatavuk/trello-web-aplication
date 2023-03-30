import { Component, Input } from '@angular/core';
import { TrelloCard } from '../shared/interfaces/trello-card';
import { TrelloCardService } from '../shared/services/trello-card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card?: TrelloCard;
  now = new Date();
  cardNameInput: string = "";
  cardDescriptionInput: string = "";
  cardDueDateInput: Date = this.now;

  constructor(private trelloCardService: TrelloCardService) {}

  initializeCardVariables(){
    if(this.card != null){
      this.cardNameInput = this.card.cardName;
      this.cardDescriptionInput = this.card.description;
      this.cardDueDateInput = this.card.dueDate;
    }
  }

  ngOnInit(){
    this.initializeCardVariables();
  }

  onNameInputBlur(){
    if (this.card != null && this.cardNameInput !== this.card.cardName) {
      this.card.cardName = this.cardNameInput;
      this.trelloCardService.updateCard(this.card.cardId, this.card).subscribe();
    }
  }

  onDescriptionInputBlur(){
    if (this.card != null && this.cardDescriptionInput !== this.card.description) {
      this.card.description = this.cardDescriptionInput;
      this.trelloCardService.updateCard(this.card.cardId, this.card).subscribe();
    }
  }
  
}
