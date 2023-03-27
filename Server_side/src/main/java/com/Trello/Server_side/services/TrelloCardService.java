package com.Trello.Server_side.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Trello.Server_side.models.TrelloBoard;
import com.Trello.Server_side.models.TrelloCard;
import com.Trello.Server_side.models.TrelloList;
import com.Trello.Server_side.repositories.TrelloCardRepository;

@Service
public class TrelloCardService {

    @Autowired
    private TrelloCardRepository trelloCardRepository;
    @Autowired
    private TrelloListService trelloListService;

    public List<TrelloCard> getAllCards() {
        return trelloCardRepository.findAll();
    }

    //Get card by ID
    public TrelloCard getCardById(int cardId) {
        return trelloCardRepository.findById(cardId).orElse(null);
    }
	
	// Get all cards on this list
	public List<TrelloCard> getAllCardsByListId(int listId) {
		TrelloList list = trelloListService.getListById(listId);
		return trelloCardRepository.findAllByList(list);
	}

    public TrelloCard createCard(TrelloCard card) {
        return trelloCardRepository.save(card);
    }

//    public TrelloCard updateCard(int cardId, TrelloCard cardDetails) {
//    	TrelloCard card = getCardById(cardId);
//    	card.setName(cardDetails.getName());
//    	card.setDescription(cardDetails.getDescription());
//    	card.setPosition(cardDetails.getPosition());
//    	card.setDueDate(cardDetails.getDueDate());
//    	card.setUpdatedAt(LocalDateTime.now());
//        return trelloCardRepository.save(card);
//    }
//
//    public void deleteCard(int cardId) {
//    	TrelloCard card = getCardById(cardId);
//        trelloCardRepository.delete(card);
//    }
}
