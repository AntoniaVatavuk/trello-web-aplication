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
    
    @GetMapping("/{boardId}")
    public TrelloBoard getBoardByBoardId(@PathVariable int boardId) {
        return trelloBoardService.getBoardById(boardId);
    }
    
    @GetMapping("/user/{userId}")
    public List<TrelloBoard> getAllBoardsByUserId(@PathVariable int userId) {
        return trelloBoardService.getAllBoardsByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<TrelloBoard> createBoard(@RequestBody TrelloBoard board, int userId) {
	    // Get the user associated with this board
    	TrelloUser trelloUser = trelloUserService.getUserById(userId);
    	board.setUser(trelloUser);
    	TrelloBoard createdBoard = trelloBoardService.createBoard(board);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBoard);
    }

//    @PutMapping("/{boardId}")
//    public TrelloBoard updateBoard(@PathVariable int boardId, @RequestBody TrelloBoard board) {
//        return trelloBoardService.updateBoard(boardId, board);
//    }
//
    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable int boardId) {
    	trelloBoardService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }
}
