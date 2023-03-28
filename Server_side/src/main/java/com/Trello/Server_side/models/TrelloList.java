package com.Trello.Server_side.models;

import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "trello_lists")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
	private Date createdAt;
  
	@Column(name = "updated_at")
	private Date updatedAt;
  
	public TrelloList() {}
  
	public TrelloList(TrelloBoard board, String listName, int position) {
		this.board = board;
		this.listName = listName;
		this.position = position;
		this.createdAt = Calendar.getInstance().getTime();
		this.updatedAt = Calendar.getInstance().getTime();
	}
  
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
  
	public Date getCreatedAt() {
		return createdAt;
	}
  
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
  
	public Date getUpdatedAt() {
		return updatedAt;
	}
  
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
}