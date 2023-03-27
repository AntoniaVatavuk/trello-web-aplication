package com.Trello.Server_side.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "trello_lists")
public class TrelloList {
  
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "list_id")
	private int listId;
  
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id", referencedColumnName = "board_id")
	private TrelloBoard board;
  
	@Column(name = "list_name")
	private String listName;
  
	@Column(name = "position")
	private int position;
  
	@Column(name = "created_at")
	private LocalDateTime createdAt;
  
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
  
	public TrelloList() {
	}
  
	public TrelloList(TrelloBoard board, String listName, int position) {
		this.board = board;
		this.listName = listName;
		this.position = position;
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}
  
 	// Getters and Setters
  
	public int getListId() {
		return listId;
	}
  
	public void setListId(int listId) {
		this.listId = listId;
	}
  
	public TrelloBoard getBoard() {
		return board;
	}
  
	public void setBoard(TrelloBoard board) {
		this.board = board;
	}
  
	public String getListName() {
		return listName;
	}
  
	public void setListName(String listName) {
		this.listName = listName;
	}
  
	public int getPosition() {
		return position;
	}
  
	public void setPosition(int position) {
		this.position = position;
	}
  
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
  
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
  
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
  
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
}