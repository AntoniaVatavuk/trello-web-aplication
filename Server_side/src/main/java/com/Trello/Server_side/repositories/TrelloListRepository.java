package com.Trello.Server_side.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Trello.Server_side.models.TrelloBoard;
import com.Trello.Server_side.models.TrelloList;

@Repository
public interface TrelloListRepository extends JpaRepository<TrelloList, Integer> {
	List<TrelloList> findAllByBoard(TrelloBoard board);
}
