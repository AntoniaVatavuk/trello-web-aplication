import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TrelloCard } from './shared/interfaces/trello-card';
import { TrelloCardService } from './shared/services/trello-card.service';
import { TrelloListService } from './shared/services/trello-list.service';

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

  updateCardPosition(cardId: number, card: TrelloCard, newPosition: number){
    card.position = newPosition;
    this.trelloCardService.updateCard(cardId, card);
  }

  updateCardList(cardId: number, card: TrelloCard, newList: number){

    // card.list = newList;
    this.trelloCardService.updateCard(cardId, card);
  }

  public drop(event: CdkDragDrop<TrelloCard[]>, cards: TrelloCard[]) {
    if (event.previousContainer === event.container) {
      moveItemInArray(cards, event.previousIndex, event.currentIndex);
      // this.trelloCardService.updateCard(event[event.currentIndex])
      //TODO add DB related stuff
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        //TODO add DB related stuff
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