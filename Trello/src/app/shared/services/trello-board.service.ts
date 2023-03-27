import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { baseURL } from "./../global";
import { TrelloBoard } from '../interfaces/trello-board';

@Injectable({
  providedIn: 'root'
})
export class TrelloBoardService {
  private readonly boardURL = baseURL + "boards";

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('User not found');
    } else if (error.status === 500) {
      console.error('Server error');
    } else {
      console.error('Unknown error');
    }
    return throwError('Something went wrong');
  }

  /* GET */
  getBoard(boardId: number): Observable<TrelloBoard> {
    const url = `${this.boardURL}/${boardId}`;
    return this.http.get<TrelloBoard>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getBoardsByUserId(userId: number): Observable<TrelloBoard[]> {
    const url = `${this.boardURL}/user/${userId}`;
    return this.http.get<TrelloBoard[]>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* POST */
  createBoard(board: TrelloBoard): Observable<TrelloBoard> {
    const url = `${this.boardURL}`;
    return this.http.post<TrelloBoard>(url, board, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* PUT */
  updateBoard(boardId: number, board: TrelloBoard): Observable<any> {
    const url = `${this.boardURL}/${boardId}`;
    return this.http.put(url, board, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* DELETE */
  deleteBoard(boardId: number): Observable<TrelloBoard> {
    const url = `${this.boardURL}/${boardId}`;
    return this.http.delete<TrelloBoard>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

}
