package com.Trello.Server_side.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Trello.Server_side.models.TrelloBoard;
import com.Trello.Server_side.models.TrelloUser;
import com.Trello.Server_side.services.TrelloBoardService;
import com.Trello.Server_side.services.TrelloUserService;

@RestController
@RequestMapping("/api/boards")
public class TrelloBoardController {

    @Autowired
    private TrelloBoardService trelloBoardService;
    @Autowired
    private TrelloUserService trelloUserService;
    
    // get board by ID
    @GetMapping("/{boardId}")
    public ResponseEntity<TrelloBoard> getBoardByBoardId(@PathVariable int boardId) {
        TrelloBoard board = trelloBoardService.getBoardById(boardId);
    	if (board == null) {
    		return ResponseEntity.notFound().build();
    	}
    	return ResponseEntity.ok(board);
    }
    
    // get all boards from this user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TrelloBoard>> getAllBoardsByUserId(@PathVariable int userId) {
    	List<TrelloBoard> boards =  trelloBoardService.getAllBoardsByUserId(userId);
        if (boards == null) {
            return ResponseEntity.notFound().build();
        }
		return ResponseEntity.ok(boards);
    }

    // create new board
    @PostMapping
    public ResponseEntity<TrelloBoard> createBoard(@RequestBody TrelloBoard board, int userId) {
	    // Get the user associated with this board
    	TrelloUser user = trelloUserService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
    	board.setUser(user);
    	TrelloBoard createdBoard = trelloBoardService.createBoard(board);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBoard);
    }

    // update existing board
    @PutMapping("/{boardId}")
    public ResponseEntity<TrelloBoard> updateBoard(@PathVariable int boardId, @RequestBody TrelloBoard board) {
	  	TrelloBoard updatedBoard = trelloBoardService.updateBoard(boardId, board);
	  	if (updatedBoard == null) {
	  		return ResponseEntity.notFound().build();
	  	}
        return ResponseEntity.ok(updatedBoard);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable int boardId) {
    	trelloBoardService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }
}
