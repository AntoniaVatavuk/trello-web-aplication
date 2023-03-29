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

  // selectBoard(list: TrelloList){
  //   this.getAllListsOnBoard();
  //   this.updateSelectedBoard();
  // }

  updateSelectedBoard(){
    if (this.currentBoardId != null) {
      this.trelloBoardService.getBoard(this.currentBoardId).subscribe(board => this.board = board);
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

  ngOnDestroy(){
    // save all positions to db
  }

  updateListPosition(list: TrelloList, newPosition: number){
    console.log("update list: ", list);
    if(this.currentBoardId != null){
      console.log("old position: ", list.position);
      list.position = newPosition;
      console.log("new position: ", list.position);

      this.trelloListService.updateList(list.listId, list);
    }
  }

  drop(event: CdkDragDrop<TrelloList[]>, lists: TrelloList[]) {
    console.log("event.currentIndex ", event.currentIndex);
    console.log("event.previousIndex ", event.previousIndex);
    moveItemInArray(lists, event.previousIndex, event.currentIndex);
    console.log("lists[event.currentIndex] before move", lists[event.currentIndex]);
    this.updateListPosition(lists[event.currentIndex], event.currentIndex);
    console.log("lists[event.currentIndex] after move", lists[event.currentIndex]);

  }



  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  // drop(event: CdkDragDrop<TrelloList>) {
  //   if (event.previousContainer === event.container) {
  //     this.trelloCardService.updateCardPosition;
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }

}
