import { Component, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TrelloList } from '../shared/interfaces/trello-list';
import { TrelloListService } from '../shared/services/trello-list.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() currentBoardId?: number | null = null;
  lists$!: Observable<TrelloList[]>;

  constructor(private trelloListService: TrelloListService){}

  getAllListsOnBoard(){
    if(this.currentBoardId != null){
      this.lists$ = this.trelloListService.getListsByBoardId(this.currentBoardId);
      // this.lists$.subscribe(lists => console.log(lists));
    }
  }

  selectBoard(list: TrelloList){
    this.getAllListsOnBoard();
  }

  // lifecycle hooks
  ngOnInit(){
    this.getAllListsOnBoard();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentBoardId']) {
      this.getAllListsOnBoard();
    }
  }



  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<TrelloList[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
