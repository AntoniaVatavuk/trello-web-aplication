package com.Trello.Server_side.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Trello.Server_side.models.TrelloBoard;
import com.Trello.Server_side.models.TrelloUser;
import com.Trello.Server_side.repositories.TrelloBoardRepository;

@Service
public class TrelloBoardService {

    @Autowired
    private TrelloBoardRepository trelloBoardRepository;
    @Autowired
    private TrelloUserService trelloUserService;
    
    public TrelloBoard getBoardById(int boardId) {
        return trelloBoardRepository.findById(boardId).orElse(null);
    }

    public List<TrelloBoard> getAllBoardsByUserId(int userId) {
    	TrelloUser user = trelloUserService.getUserById(userId);
        return trelloBoardRepository.findAllByUser(user);
    }
	
    public TrelloBoard createBoard(TrelloBoard board) {
        board.setCreatedAt(LocalDateTime.now());
        board.setUpdatedAt(LocalDateTime.now());
        return trelloBoardRepository.save(board);
    }
    
//    public List<TrelloBoard> getAllBoards() {
//        return trelloBoardRepository.findAll();
//    }
//
//    public TrelloBoard updateBoard(int boardId, TrelloBoard board) {
//    	TrelloBoard existingBoard = trelloBoardRepository.findById(boardId).orElse(null);
//        existingBoard.setBoardName(board.getBoardName());
//        existingBoard.setUpdatedAt(LocalDateTime.now());
//        return trelloBoardRepository.save(existingBoard);
//    }
//
    public void deleteBoard(int boardId) {
    	TrelloBoard existingBoard = trelloBoardRepository.findById(boardId).orElse(null);
    	trelloBoardRepository.delete(existingBoard);
    }
}
