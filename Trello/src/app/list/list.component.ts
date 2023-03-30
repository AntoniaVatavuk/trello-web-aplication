import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TrelloCard } from '../shared/interfaces/trello-card';
import { TrelloList } from '../shared/interfaces/trello-list';
import { TrelloCardService } from "./../shared/services/trello-card.service";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AppService } from '../app.service';
import { TrelloListService } from '../shared/services/trello-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list: TrelloList | null = null;
  cards$!: Observable<TrelloCard[]>;
  listNameInput: string = "";

  constructor(
    private trelloCardService: TrelloCardService,
    private appService: AppService,
    private trelloListService: TrelloListService
    ) {}

  bubbleSortCards(cards: TrelloCard[]) {
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards.length - i - 1; j++) {
        if (cards[j+1].position < cards[j].position) {
          [cards[j + 1], cards[j]] = [cards[j], cards[j + 1]];
        }
      }
    }
    return cards;
  }

  getAllCardsOnList(): void {
    if(this.list != null){
      this.cards$ = this.trelloCardService.getCardsByListId(this.list?.listId).pipe(map(cards => this.bubbleSortCards(cards)));
      // this.cards$.subscribe(cards => console.log(cards));
    }
  }

  ngOnInit(): void {
    this.getAllCardsOnList();
    if (this.list != null) {
      this.listNameInput = this.list?.listName;
    }
  }

  onInputBlur(){
    if (this.list != null && this.listNameInput !== this.list.listName) {
      this.list.listName = this.listNameInput;
      this.trelloListService.updateList(this.list.listId, this.list).subscribe();
    }
  }

  onDrop(event: CdkDragDrop<TrelloCard[]>) {
    this.appService.drop(event, this.list);
  }

}
