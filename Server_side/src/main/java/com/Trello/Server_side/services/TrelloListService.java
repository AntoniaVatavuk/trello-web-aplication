package com.Trello.Server_side.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Trello.Server_side.models.TrelloBoard;
import com.Trello.Server_side.models.TrelloCard;
import com.Trello.Server_side.models.TrelloList;
import com.Trello.Server_side.repositories.TrelloListRepository;

@Service
public class TrelloListService {

    @Autowired
	private TrelloListRepository trelloListRepository;
    @Autowired
	private TrelloBoardService trelloBoardService;
	
    // Get list by list ID
	public TrelloList getListById(int trelloListId) {
		return trelloListRepository.findById(trelloListId).orElse(null);
	}

	public TrelloList createList(TrelloList trelloList) {
		return trelloListRepository.save(trelloList);
	}

//	//Get all lists on this board
//	public List<TrelloList> getAllListsByBoardId(int boardId) {
//		TrelloBoard board = trelloBoardService.getBoardById(boardId);
//		return trelloListRepository.findAllByBoard(board);
//	}
//
//	public TrelloList updateList(TrelloList trelloList) {
//		return trelloListRepository.save(trelloList);
//	}
//  
//    public void deleteListById(int trelloListId) {
//    	trelloListRepository.deleteById(trelloListId);
//    }
//  
//	public TrelloList getListByName(String trelloListName) {
//		return trelloListRepository.findByListName(trelloListName);
//	}
}

