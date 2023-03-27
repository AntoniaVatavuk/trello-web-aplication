package com.Trello.Server_side.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Trello.Server_side.models.TrelloBoard;
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

    @GetMapping("/{cardId}")
    public TrelloCard getCardById(@PathVariable int cardId) {
        return trelloCardService.getCardById(cardId);
    }
    
    @PostMapping
    public ResponseEntity<TrelloCard> createCard(@Valid @RequestBody TrelloCard card, @PathVariable int listId) {
	    // Get the list associated with this card
	    TrelloList trelloList = trelloListService.getListById(listId);
	    card.setList(trelloList);
    	TrelloCard createdCard = trelloCardService.createCard(card);
        return new ResponseEntity<>(createdCard, HttpStatus.CREATED);
    }

//    @GetMapping
//    public List<TrelloCard> getAllCards() {
//        return trelloCardService.getAllCards();
//    }
//    
//    @GetMapping("/username/{username}")
//    public TrelloCard getCardById(@PathVariable String username) {
//        return trelloCardService.getCardById(username);
//    }
//
//    @GetMapping("/{listId}")
//    public List<TrelloCard> getAllCardsByListId(@PathVariable int listId) {
//        return trelloCardService.getAllCardsByListId(listId);
//    }
//    
//
//    @PutMapping("/{cardId}")
//    public TrelloCard updateCard(@PathVariable int cardId, @Valid @RequestBody TrelloCard cardDetails) {
//        return trelloCardService.updateCard(cardId, cardDetails);
//    }
//
//    @DeleteMapping("/{cardId}")
//    public ResponseEntity<?> deleteCard(@PathVariable int cardId) {
//    	trelloCardService.deleteCard(cardId);
//        return ResponseEntity.noContent().build();
//    }
}
