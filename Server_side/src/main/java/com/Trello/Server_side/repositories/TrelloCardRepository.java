package com.Trello.Server_side.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Trello.Server_side.models.TrelloCard;
import com.Trello.Server_side.models.TrelloList;

@Repository
public interface TrelloCardRepository extends JpaRepository<TrelloCard, Integer> {
	List<TrelloCard> findAllByList(TrelloList list);
}