import { Component, Input } from '@angular/core';
import { TrelloCard } from '../shared/interfaces/trello-card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card?: TrelloCard;
}
