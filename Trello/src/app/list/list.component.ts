import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TrelloCard } from '../shared/interfaces/trello-card';
import { TrelloList } from '../shared/interfaces/trello-list';
import { TrelloCardService } from "./../shared/services/trello-card.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list: TrelloList | null = null;

  cards$!: Observable<TrelloCard[]>;

  constructor(private trelloCardService: TrelloCardService) {}

  getAllCardsOnList(): void {
    if(this.list != null){
      this.cards$ = this.trelloCardService.getCardsByListId(this.list?.listId);
      // this.cards$.subscribe(cards => console.log(cards));
    }
  }

  ngOnInit(): void {
    this.getAllCardsOnList();
  }
}
