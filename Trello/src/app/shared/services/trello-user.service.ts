import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from "./../global";
import { TrelloUser } from '../interfaces/trello-user';

@Injectable({
  providedIn: 'root'
})
export class TrelloUserService {
  private readonly userURL = baseURL + "users";

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
  checkUser(email: string, password: string): Observable<TrelloUser> {
    const url = `${this.userURL}/login/${email}/${password}`;
    return this.http.get<TrelloUser>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUserByUsername(username: string): Observable<TrelloUser> {
    const url = `${this.userURL}/${username}`;
    return this.http.get<TrelloUser>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUserById(userId: number): Observable<TrelloUser> {
    const url = `${this.userURL}/${userId}`;
    return this.http.get<TrelloUser>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* POST */
  createUser(user: TrelloUser): Observable<TrelloUser> {
    const url = `${this.userURL}`;
    return this.http.post<TrelloUser>(url, JSON.stringify(user, null, 4), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* PUT */
  updateUser(id: number, user: TrelloUser): Observable<any> {
    const url = `${this.userURL}/${id}`;
    return this.http.put(url, JSON.stringify(user, null, 4), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /* DELETE */
  deleteUser(id: number): Observable<TrelloUser> {
    const url = `${this.userURL}/${id}`;
    return this.http.delete<TrelloUser>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
}
