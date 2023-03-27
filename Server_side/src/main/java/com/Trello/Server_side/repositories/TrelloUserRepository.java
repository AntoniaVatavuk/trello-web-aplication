package com.Trello.Server_side.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Trello.Server_side.models.TrelloUser;

public interface TrelloUserRepository extends JpaRepository<TrelloUser, Integer> {
	TrelloUser findByUsername(String username);
	TrelloUser findByEmail(String email);
//	void deleteByUserId(int userId);
}
