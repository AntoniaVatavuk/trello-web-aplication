package com.Trello.Server_side.services;

import java.util.Calendar;
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
        if (user == null) {
            return null;
        }
        return trelloBoardRepository.findAllByUser(user);
    }
	
    public TrelloBoard createBoard(TrelloBoard board) {
        if (board == null) {
            return null;
        }
        board.setCreatedAt(Calendar.getInstance().getTime());
        board.setUpdatedAt(Calendar.getInstance().getTime());
        return trelloBoardRepository.save(board);
    }


    public TrelloBoard updateBoard(int boardId, TrelloBoard board) {
        if (board == null) {
            return null;
        }
    	TrelloBoard existingBoard = getBoardById(boardId);
        if (existingBoard == null) {
            return null;
        }
        existingBoard.setBoardName(board.getBoardName());
        existingBoard.setUpdatedAt(Calendar.getInstance().getTime());
        return trelloBoardRepository.save(existingBoard);
    }

    public void deleteBoard(int boardId) {
    	TrelloBoard existingBoard = getBoardById(boardId);
    	trelloBoardRepository.delete(existingBoard);
    }
}
