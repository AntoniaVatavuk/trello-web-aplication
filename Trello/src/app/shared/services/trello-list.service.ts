import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from "./../global";
import { TrelloBoard } from '../interfaces/trello-board';
import { TrelloUser } from "../interfaces/trello-user";
import { TrelloCard } from "../interfaces/trello-card";
import { TrelloList } from "../interfaces/trello-list";

@Injectable({
  providedIn: 'root'
})
export class TrelloListService {
  private readonly listURL = baseURL + "lists";

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('List not found');
    } else if (error.status === 500) {
      console.error('Server error');
    } else {
      console.error('Unknown error');
    }
    return throwError('Something went wrong');
  }

  /* GET */
  getList(lisdtID: number): Observable<TrelloList> {
    const url = `${this.listURL}/${lisdtID}`;
    return this.http.get<TrelloList>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getListsByBoardId(boardId: number): Observable<TrelloList[]> {
    const url = `${this.listURL}/board/${boardId}`;
    return this.http.get<TrelloList[]>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* POST */
  createList(list: TrelloList): Observable<TrelloList> {
    const url = `${this.listURL}`;
    return this.http.post<TrelloList>(url, list, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* PUT */
  updateList(listId: number, list: TrelloList): Observable<any> {
    console.log("inside service ");
    console.log("listId: ", listId);
    console.log("list: ", list);
    console.log("list as json: ", JSON.stringify(list, null, 4));
    const url = `${this.listURL}/${listId}`;
    console.log("URL: ", url);
    return this.http.put<TrelloList>(url, JSON.stringify(list, null, 4), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* DELETE */
  deleteList(listId: number): Observable<TrelloList> {
    const url = `${this.listURL}/${listId}`;
    return this.http.delete<TrelloList>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
}
