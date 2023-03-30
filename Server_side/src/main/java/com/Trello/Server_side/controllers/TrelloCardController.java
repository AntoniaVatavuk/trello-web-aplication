package com.Trello.Server_side.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Trello.Server_side.models.TrelloCard;
import com.Trello.Server_side.models.TrelloList;
import com.Trello.Server_side.services.TrelloCardService;
import com.Trello.Server_side.services.TrelloListService;

@RestController
@RequestMapping("/api/cards")
public class TrelloCardController {

    @Autowired
    private TrelloCardService trelloCardService;
    @Autowired
    private TrelloListService trelloListService;

    // get card by card ID
    @GetMapping("/{cardId}")
    public ResponseEntity<TrelloCard> getCardById(@PathVariable int cardId) {
    	TrelloCard card = trelloCardService.getCardById(cardId);
    	if (card == null) {
    		return ResponseEntity.notFound().build();
    	}
    	return ResponseEntity.ok(card);
    }

    // get all cards on this list
	@GetMapping("/list/{listId}")
	public ResponseEntity<List<TrelloCard>> getAllCardsByListId(@PathVariable int listId) {
		List<TrelloCard> cards = trelloCardService.getAllCardsByListId(listId);
        if (cards == null) {
            return ResponseEntity.notFound().build();
        }
		return ResponseEntity.ok(cards);
	}
    
    // create new card
    @PostMapping
    public ResponseEntity<TrelloCard> createCard(@Valid @RequestBody TrelloCard card, @PathVariable int listId) {
	    // Get the list associated with this card
	    TrelloList list = trelloListService.getListById(listId);
        if (list == null) {
            return ResponseEntity.notFound().build();
        }
	    card.setList(list);
    	TrelloCard createdCard = trelloCardService.createCard(card);
        return new ResponseEntity<>(createdCard, HttpStatus.CREATED);
    }    
    
    // update existing board
	@PutMapping("/{cardId}")
	public ResponseEntity<TrelloCard> updateCard(@PathVariable int cardId, @Valid @RequestBody TrelloCard card) {
	  	TrelloCard updatedCard = trelloCardService.updateCard(cardId, card);
	  	if (updatedCard == null) {
	  		return ResponseEntity.notFound().build();
	  	}
	  	return ResponseEntity.ok(updatedCard);
	}
	
	//update card list
	@PutMapping("/card/{cardId}/list/{listId}")
	public ResponseEntity<TrelloCard> updateCardList(@PathVariable int cardId, @PathVariable int listId, @RequestBody TrelloCard card) {		
	    TrelloCard updatedCards = trelloCardService.updateCardList(cardId, listId, card);
	    if (updatedCards == null) {
	    	return ResponseEntity.notFound().build();
	    }
	    return ResponseEntity.ok(updatedCards);
	}

	//update more than one existing card
	@PutMapping("/cards")
	public ResponseEntity<List<TrelloCard>> updateAllCards(@RequestBody List<TrelloCard> cards) {		
	    List<TrelloCard> updatedCards = trelloCardService.updateAllCards(cards);
	    if (updatedCards == null) {
	    	return ResponseEntity.notFound().build();
	    }
	    return ResponseEntity.ok(updatedCards);
	}

	// delete board
	@DeleteMapping("/{cardId}")
	public ResponseEntity<?> deleteCard(@PathVariable int cardId) {
	  	trelloCardService.deleteCard(cardId);
	    return ResponseEntity.noContent().build();
	}
}
