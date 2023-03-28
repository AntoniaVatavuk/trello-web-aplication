import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
}
