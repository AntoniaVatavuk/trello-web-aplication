import { Component, Input } from '@angular/core';
import { map, Observable, of, merge, tap } from 'rxjs';
import { TrelloCard } from '../shared/interfaces/trello-card';
import { TrelloList } from '../shared/interfaces/trello-list';
import { TrelloCardService } from "./../shared/services/trello-card.service";
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AppService } from '../app.service';
import { TrelloListService } from '../shared/services/trello-list.service';
import { AddNewCardComponent } from '../add-new-card/add-new-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list!: TrelloList ;
  cards$!: Observable<TrelloCard[]>;
  listNameInput: string = "";
  cardListSize: number = 0;

  constructor(
    private trelloCardService: TrelloCardService,
    private appService: AppService,
    private trelloListService: TrelloListService,
    public dialog: MatDialog
    ) {}

  bubbleSortCards(cards: TrelloCard[]) {
    this.cardListSize = cards.length;
    for (let i = 0; i < this.cardListSize; i++) {
      for (let j = 0; j < this.cardListSize - i - 1; j++) {
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
    }
  }

  addNewCardToList(){
    this.cards$ 
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

  openAddNewCardDialog(){
    const newCardDialogRef = this.dialog.open(AddNewCardComponent, {
      data: this.list,
    });

    newCardDialogRef.afterClosed().subscribe((result: TrelloCard) => {
      result.position = this.cardListSize;
      this.cardListSize++;
      this.trelloCardService.createCard(result, this.list.listId)
        .pipe(
          map(() => {
            this.cards$ = this.cards$.pipe(
              map((cards: TrelloCard[]) => [...cards]),
            );
          })
        ).subscribe();
    });
  }

}
