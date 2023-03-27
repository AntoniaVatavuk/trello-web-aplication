import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from "./../global";
import { TrelloCard } from "../interfaces/trello-card";

@Injectable({
  providedIn: 'root'
})
export class TrelloCardService {
  private readonly cardURL = baseURL + "cards";

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

   /* GET */
   getCard(cardId: number): Observable<TrelloCard> {
    const url = `${this.cardURL}/${cardId}`;
    return this.http.get<TrelloCard>(url);
  }

  getCardsByListId(listId: number): Observable<TrelloCard[]> {
    const url = `${this.cardURL}/${listId}`;
    return this.http.get<TrelloCard[]>(url);
  }

  /* POST */
  createCard(card: TrelloCard): Observable<TrelloCard> {
    const url = `${this.cardURL}`;
    return this.http.post<TrelloCard>(url, card, this.httpOptions);
  }

  /* PUT */
  updateCard(cardId: number, card: TrelloCard): Observable<any> {
    const url = `${this.cardURL}/${cardId}`;
    return this.http.put(url, card, this.httpOptions);
  }

  /* DELETE */
  deleteCard(cardId: number): Observable<TrelloCard> {
    const url = `${this.cardURL}/${cardId}`;
    return this.http.delete<TrelloCard>(url, this.httpOptions);
  }

}

