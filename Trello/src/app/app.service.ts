import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TrelloCard } from './shared/interfaces/trello-card';
import { TrelloCardService } from './shared/services/trello-card.service';
import { TrelloListService } from './shared/services/trello-list.service';
import { TrelloList } from './shared/interfaces/trello-list';

@Injectable()
export class AppService {

  // authenticated = false;

  constructor(private http: HttpClient, private trelloCardService: TrelloCardService, private trelloListService: TrelloListService) {
  }

  public saveDataToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getDataToLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
  public removeDataToLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  public clearDataToLocalStorage() {
    localStorage.clear();
  }

  // after drop event, more than one card changes their position, also update list if list is changed
  updateAllCardsPosition(cards: TrelloCard[], list: TrelloList | null){
    if (cards.length !== 0) { 
      for (let i = 0; i < cards.length; i++) {
        cards[i].position = i;
        if(list != null && list.listId != cards[i].list.listId){
          cards[i].list = list;
          this.trelloCardService.updateCardList(cards[i], list.listId).subscribe(); 
        }
      }
      this.trelloCardService.updateAllCards(cards).subscribe();
    }
  }

  public drop(event: CdkDragDrop<TrelloCard[]>, currentList: TrelloList | null) {
    // currentList is value of the list where the card was dropped
    if (event.previousContainer === event.container && event.previousIndex !== event.currentIndex) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateAllCardsPosition(event.container.data, null);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateAllCardsPosition(event.previousContainer.data, null);
      this.updateAllCardsPosition(event.container.data, currentList);
    }
  }

  // authenticate(credentials, callback) {

  //       const headers = new HttpHeaders(credentials ? {
  //           authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
  //       } : {});

  //       this.http.get('user', {headers: headers}).subscribe(response => {
  //           if (response['name']) {
  //               this.authenticated = true;
  //           } else {
  //               this.authenticated = false;
  //           }
  //           return callback && callback();
  //       });

  //   }

}