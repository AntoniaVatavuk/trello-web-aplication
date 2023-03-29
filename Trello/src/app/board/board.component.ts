import { Component, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TrelloList } from '../shared/interfaces/trello-list';
import { TrelloListService } from '../shared/services/trello-list.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TrelloBoardService } from '../shared/services/trello-board.service';
import { TrelloBoard } from '../shared/interfaces/trello-board';
import { AppService } from '../app.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() currentBoardId?: number | null = null;
  lists$!: Observable<TrelloList[]>;
  // lists!: TrelloList[];
  board: TrelloBoard | null = null;

  constructor(
    private trelloListService: TrelloListService,
    private trelloBoardService: TrelloBoardService,
    private appService: AppService
    ){}

  getAllListsOnBoard(){
    if(this.currentBoardId != null){
      this.lists$ = this.trelloListService.getListsByBoardId(this.currentBoardId);
      // this.lists$.subscribe(lists => this.lists);
    }
  }

  selectBoard(list: TrelloList){
    this.getAllListsOnBoard();
  }

  // lifecycle hooks
  ngOnInit(){
    this.getAllListsOnBoard();
    if (this.currentBoardId != null) {
      this.trelloBoardService.getBoard(this.currentBoardId).subscribe(board => this.board = board);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentBoardId']) {
      this.getAllListsOnBoard();
    }
  }
  ngOnDestroy(){
    // save all positions to db
  }

  updateListPosition(list: TrelloList, newPosition: number){
    if(this.currentBoardId != null){
      list.position = newPosition;
      this.trelloListService.updateList(list.listId, list);
    }
  }

  drop(event: CdkDragDrop<TrelloList[]>, lists: TrelloList[]) {
    moveItemInArray(lists, event.previousIndex, event.currentIndex);
    this.updateListPosition(lists[event.currentIndex], event.currentIndex);
  }

}
