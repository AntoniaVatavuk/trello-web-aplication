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
  board?: TrelloBoard;
  boardNameInput: string = "";

  constructor(
    private trelloListService: TrelloListService,
    private trelloBoardService: TrelloBoardService,
    private appService: AppService
    ){}

  getAllListsOnBoard(){
    if(this.currentBoardId != null){
      this.lists$ = this.trelloListService.getListsByBoardId(this.currentBoardId);

    }
  }

  updateSelectedBoard(){
    if (this.currentBoardId != null) {
      this.trelloBoardService.getBoard(this.currentBoardId).subscribe(board => {
        this.boardNameInput = board.boardName
        this.board = board;
      });
    }
  }  

  // lifecycle hooks
  ngOnInit(){
    this.getAllListsOnBoard();
    this.updateSelectedBoard();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentBoardId']) {
      this.getAllListsOnBoard();
      this.updateSelectedBoard();
    }
  }

  onInputBlur(){
    if (this.board != null && this.boardNameInput !== this.board.boardName) {
      this.board.boardName = this.boardNameInput;
      this.trelloBoardService.updateBoard(this.board.boardId, this.board).subscribe();
    }
  }

  // after drop event, more than one list changes their position so we send a list of lists to update positions all in one go
  updateAllListsPosition(lists: TrelloList[]){
    if(this.currentBoardId != null){
      for (let i = 0; i < lists.length; i++) {
        lists[i].position = i;
      }
      this.trelloListService.updateAllLists(lists).subscribe();
    }
  }

  drop(event: CdkDragDrop<TrelloList[]>, lists: TrelloList[]) {
    if(event.previousIndex !== event.currentIndex){
      moveItemInArray(lists, event.previousIndex, event.currentIndex);
      this.updateAllListsPosition(lists);
    }
  }

}
