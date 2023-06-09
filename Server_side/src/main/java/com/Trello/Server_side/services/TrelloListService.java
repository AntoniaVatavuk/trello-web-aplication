package com.Trello.Server_side.services;

import java.util.ArrayList;
import java.util.Calendar;
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
    @Autowired
	private TrelloCardService trelloCardService;
	
    // Get list by list ID
	public TrelloList getListById(int listId) {
		return trelloListRepository.findById(listId).orElse(null);
	}
	
	//Get all lists on this board
	public List<TrelloList> getAllListsByBoardId(int boardId) {
		TrelloBoard board = trelloBoardService.getBoardById(boardId);
		return trelloListRepository.findAllByBoard(board);
	}

	public TrelloList createList(TrelloList list) {
		list.setCreatedAt(Calendar.getInstance().getTime());
		list.setUpdatedAt(Calendar.getInstance().getTime());
		return trelloListRepository.save(list);
	}

	// update one list
	public TrelloList updateList(int listId, TrelloList list) {
		TrelloList existingList = getListById(listId);
        if (existingList == null) {
            return null;
        }
        existingList.setBoard(list.getBoard());
        existingList.setListName(list.getListName());
        existingList.setPosition(list.getPosition());
        existingList.setUpdatedAt(Calendar.getInstance().getTime());
		return trelloListRepository.save(existingList);
	}

	// update more than one list
	public List<TrelloList> updateAllLists(List<TrelloList> lists) {
		List<TrelloList> allUpdatedLists = new ArrayList<TrelloList>();
		for (TrelloList list : lists) {
			TrelloList updatedList = updateList(list.getListId(), list);
	        if (updatedList == null) {
	            return null;
	        }
	        allUpdatedLists.add(updatedList);
		}
        if (allUpdatedLists.isEmpty()) {
            return null;
        }
		return allUpdatedLists;
	}
	
    public void deleteListById(int listId) {
    	List<TrelloCard> listCards = trelloCardService.getAllCardsByListId(listId);
    	for (TrelloCard card : listCards) {
    		trelloCardService.deleteCard(card.getCardId());
		}
		trelloListRepository.deleteById(listId);
	}
}

