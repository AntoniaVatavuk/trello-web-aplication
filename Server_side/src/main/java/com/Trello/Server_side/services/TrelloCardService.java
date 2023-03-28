package com.Trello.Server_side.services;

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

    public TrelloCard updateCard(int cardId, TrelloCard card) {
    	TrelloCard existingCard = getCardById(cardId);
        if (existingCard == null) {
            return null;
        }
        existingCard.setName(card.getName());
        existingCard.setDescription(card.getDescription());
        existingCard.setPosition(card.getPosition());
        existingCard.setDueDate(card.getDueDate());
        existingCard.setUpdatedAt(Calendar.getInstance().getTime());
        return trelloCardRepository.save(existingCard);
    }

    public void deleteCard(int cardId) {
    	TrelloCard card = getCardById(cardId);
        trelloCardRepository.delete(card);
    }
}
