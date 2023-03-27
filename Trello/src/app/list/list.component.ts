import { Component } from '@angular/core';
import { TrelloCard } from '../shared/interfaces/trello-card';
import { TrelloCardService } from "./../shared/services/trello-card.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  cards: TrelloCard[] = [];

  constructor(private trelloCardService: TrelloCardService) {}

  // TEST
  getCardsByListId(): void {
    this.trelloCardService.getCardsByListId(1)
        .subscribe(cards => this.cards = cards);
  }

  ngOnInit(): void {
    this.getCardsByListId();
  }
}
