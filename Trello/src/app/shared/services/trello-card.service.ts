import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('Card not found');
    } else if (error.status === 500) {
      console.error('Server error');
    } else {
      console.error('Unknown error');
    }
    return throwError('Something went wrong');
  }

   /* GET */
   getCard(cardId: number): Observable<TrelloCard> {
    const url = `${this.cardURL}/${cardId}`;
    return this.http.get<TrelloCard>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCardsByListId(listId: number): Observable<TrelloCard[]> {
    const url = `${this.cardURL}/list/${listId}`;
    return this.http.get<TrelloCard[]>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* POST */
  createCard(card: TrelloCard): Observable<TrelloCard> {
    const url = `${this.cardURL}`;
    return this.http.post<TrelloCard>(url, card, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* PUT */
  updateCard(cardId: number, card: TrelloCard): Observable<any> {
    const url = `${this.cardURL}/${cardId}`;
    return this.http.put(url, card, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* DELETE */
  deleteCard(cardId: number): Observable<TrelloCard> {
    const url = `${this.cardURL}/${cardId}`;
    return this.http.delete<TrelloCard>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

}

