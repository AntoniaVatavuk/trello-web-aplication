package com.Trello.Server_side.controllers;

import java.time.LocalDateTime;
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
@RequestMapping("/api/boards/{boardId}/lists")
public class TrelloListController {

    @Autowired
	private TrelloListService trelloListService;
    @Autowired
	private TrelloBoardService trelloBoardService;

	@GetMapping("/{listId}")
	public ResponseEntity<TrelloList> getListById(@PathVariable int listId) {
		TrelloList list = trelloListService.getListById(listId);
		if (list == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(list);
	}

	@PostMapping
	public ResponseEntity<TrelloList> createList(@RequestBody TrelloList list, @PathVariable int boardId) {
	    // Get the board associated with this list
	    TrelloBoard trelloBoard = trelloBoardService.getBoardById(boardId);
	    list.setBoard(trelloBoard);
	
	    TrelloList createdList = trelloListService.createList(list);
	    return ResponseEntity.status(HttpStatus.CREATED).body(createdList);
	}
  
//	@GetMapping("/board/{boardId}")
//	public ResponseEntity<List<TrelloList>> getAllListsByBoardId(@PathVariable int boardId) {
//		List<TrelloList> lists = trelloListService.getAllListsByBoardId(boardId);
//		return ResponseEntity.ok(lists);
//	}
//
//
//	@PutMapping("/{listId}")
//	public ResponseEntity<TrelloList> updateList(@RequestBody TrelloList list, @PathVariable int listId) {
//		TrelloList existingList = trelloListService.getListById(listId);
//	    if (existingList == null) {
//	    	return ResponseEntity.notFound().build();
//	    }
//	    // Update the fields of the existing list with the new values
//	    existingList.setListName(list.getListName());
//	    existingList.setPosition(list.getPosition());
//	    existingList.setUpdatedAt(LocalDateTime.now());
//	
//	    TrelloList updatedList = trelloListService.updateList(existingList);
//	    return ResponseEntity.ok(updatedList);
//	}
//
//	@DeleteMapping("/{listId}")
//	public ResponseEntity<Void> deleteListById(@PathVariable int listId) {
//		trelloListService.deleteListById(listId);
//		return ResponseEntity.noContent().build();
//	  }
}
