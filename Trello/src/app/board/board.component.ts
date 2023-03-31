import { Component, Input, SimpleChanges } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { TrelloList } from '../shared/interfaces/trello-list';
import { TrelloListService } from '../shared/services/trello-list.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TrelloBoardService } from '../shared/services/trello-board.service';
import { TrelloBoard } from '../shared/interfaces/trello-board';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewListComponent } from '../add-new-list/add-new-list.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() currentBoardId?: number | null = null;
  lists$!: Observable<TrelloList[]>;
  board!: TrelloBoard;
  boardNameInput: string = "";
  newList: TrelloList = {
    listId: -1,
    board: this.board,
    listName: '',
    position: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  listListSize: number = 0;

  constructor(
    private trelloListService: TrelloListService,
    private trelloBoardService: TrelloBoardService,
    private appService: AppService,
    public dialog: MatDialog
    ){}
  
    
  bubbleSortCards(lists: TrelloList[]) {
    this.listListSize = lists.length;
    for (let i = 0; i < this.listListSize; i++) {
      for (let j = 0; j < this.listListSize - i - 1; j++) {
        if (lists[j+1].position < lists[j].position) {
          [lists[j + 1], lists[j]] = [lists[j], lists[j + 1]];
        }
      }
    }
    return lists;
  }

  getAllListsOnBoard(){
    if(this.currentBoardId != null){
      this.lists$ = this.trelloListService.getListsByBoardId(this.currentBoardId).pipe(map(lists => this.bubbleSortCards(lists)));
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

  openAddNewListDialog(){
    const newCardDialogRef = this.dialog.open(AddNewListComponent, {
      data: this.board,
    });

    newCardDialogRef.afterClosed().subscribe((result: TrelloList) => {
      result.position = this.listListSize;
      this.listListSize++;
      this.trelloListService.createList(result, this.board.boardId)
        .pipe(
          map(() => {
            this.lists$ = this.lists$.pipe(
              map((lists: TrelloList[]) => [...lists]),
            );
          })
        ).subscribe();
    });
  }

}
