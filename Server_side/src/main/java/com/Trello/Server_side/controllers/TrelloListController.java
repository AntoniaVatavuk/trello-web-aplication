package com.Trello.Server_side.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Trello.Server_side.models.TrelloBoard;
import com.Trello.Server_side.models.TrelloList;
import com.Trello.Server_side.services.TrelloBoardService;
import com.Trello.Server_side.services.TrelloListService;

@RestController
@RequestMapping("/api/lists")
public class TrelloListController {

    @Autowired
	private TrelloListService trelloListService;
    @Autowired
	private TrelloBoardService trelloBoardService;

    // get list by ID
	@GetMapping("/{listId}")
	public ResponseEntity<TrelloList> getListById(@PathVariable int listId) {
		TrelloList list = trelloListService.getListById(listId);
		if (list == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(list);
	}
	
	// get all lists on this board
	@GetMapping("/board/{boardId}")
	public ResponseEntity<List<TrelloList>> getAllListsByBoardId(@PathVariable int boardId) {
		List<TrelloList> lists = trelloListService.getAllListsByBoardId(boardId);
        if (lists == null) {
            return ResponseEntity.notFound().build();
        }
		return ResponseEntity.ok(lists);
	}

	// create new list
	@PostMapping
	public ResponseEntity<TrelloList> createList(@RequestBody TrelloList list, @PathVariable int boardId) {
	    // Get the board associated with this list
	    TrelloBoard board = trelloBoardService.getBoardById(boardId);
        if (board == null) {
            return ResponseEntity.notFound().build();
        }
	    list.setBoard(board);
	    TrelloList createdList = trelloListService.createList(list);
	    return ResponseEntity.status(HttpStatus.CREATED).body(createdList);
	}

	//update existing list
	@PutMapping("/{listId}")
	public ResponseEntity<TrelloList> updateList(@RequestBody TrelloList list, @PathVariable int listId) {
		System.out.println(list);
	    TrelloList updatedList = trelloListService.updateList(listId, list);
	    if (updatedList == null) {
	    	return ResponseEntity.notFound().build();
	    }
	    return ResponseEntity.ok(updatedList);
	}

	//update more than one existing list
	@PutMapping("/lists")
	public ResponseEntity<List<TrelloList>> updateAllLists(@RequestBody List<TrelloList> lists) {		
	    List<TrelloList> updatedLists = trelloListService.updateAllLists(lists);
	    if (updatedLists == null) {
	    	return ResponseEntity.notFound().build();
	    }
	    return ResponseEntity.ok(updatedLists);
	}

	// delete list
	@DeleteMapping("/{listId}")
	public ResponseEntity<Void> deleteListById(@PathVariable int listId) {
		trelloListService.deleteListById(listId);
		return ResponseEntity.noContent().build();
	  }
}
