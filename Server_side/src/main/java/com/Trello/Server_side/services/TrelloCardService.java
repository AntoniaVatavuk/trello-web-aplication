package com.Trello.Server_side.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Trello.Server_side.models.TrelloCard;
import com.Trello.Server_side.models.TrelloList;
import com.Trello.Server_side.repositories.TrelloCardRepository;

@Service
public class TrelloCardService {

    @Autowired
    private TrelloCardRepository trelloCardRepository;
    @Autowired
    private TrelloListService trelloListService;

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
    	card.setCreatedAt(Calendar.getInstance().getTime());
    	card.setUpdatedAt(Calendar.getInstance().getTime());
        return trelloCardRepository.save(card);
    }

    // update one card
    public TrelloCard updateCard(int cardId, TrelloCard card) {
    	TrelloCard existingCard = getCardById(cardId);
        if (existingCard == null) {
            return null;
        }
        existingCard.setCardName(card.getCardName());
        existingCard.setDescription(card.getDescription());
        existingCard.setPosition(card.getPosition());
        existingCard.setDueDate(card.getDueDate());
        existingCard.setUpdatedAt(Calendar.getInstance().getTime());
        return trelloCardRepository.save(existingCard);
    }
    
    // update card list
    public TrelloCard updateCardList(int cardId, int listId, TrelloCard card) {
    	TrelloList list = trelloListService.getListById(listId);
    	TrelloCard existingCard = getCardById(cardId);
        if (existingCard == null) {
            return null;
        }
        existingCard.setCardName(card.getCardName());
        existingCard.setList(list);
        existingCard.setDescription(card.getDescription());
        existingCard.setPosition(card.getPosition());
        existingCard.setDueDate(card.getDueDate());
        existingCard.setUpdatedAt(Calendar.getInstance().getTime());
        return trelloCardRepository.save(existingCard);
    }
	
	public List<TrelloCard> updateAllCards(List<TrelloCard> cards) {
		List<TrelloCard> allUpdatedCards = new ArrayList<TrelloCard>();
		for (TrelloCard card : cards) {
	    	TrelloCard existingCard = getCardById(card.getCardId());
	        if (existingCard == null) {
	            return null;
	        }
	        existingCard.setCardName(card.getCardName());
	        existingCard.setDescription(card.getDescription());
	        existingCard.setPosition(card.getPosition());
	        existingCard.setDueDate(card.getDueDate());
	        existingCard.setUpdatedAt(Calendar.getInstance().getTime());
			TrelloCard updatedCard = updateCard(card.getCardId(), card);
	        if (updatedCard == null) {
	            return null;
	        }
	        allUpdatedCards.add(updatedCard);
		}
        if (allUpdatedCards.isEmpty()) {
            return null;
        }
		return allUpdatedCards;
	}

    public void deleteCard(int cardId) {
        trelloCardRepository.deleteById(cardId);
    }
}
