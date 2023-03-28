package com.Trello.Server_side.models;

import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "trello_boards")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TrelloBoard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private int boardId;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private TrelloUser user;
    
    @Column(name = "board_name")
    private String boardName;
    
    @Column(name = "created_at")
    private Date createdAt;
    
    @Column(name = "updated_at")
    private Date updatedAt;
    
    public TrelloBoard() {}
    
    public TrelloBoard(TrelloUser user, String boardName) {
        this.user = user;
        this.boardName = boardName;
        this.createdAt = Calendar.getInstance().getTime();
        this.updatedAt = Calendar.getInstance().getTime();
    }
    
    public int getBoardId() {
        return boardId;
    }
    
    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }
    
    public TrelloUser getUser() {
        return user;
    }
    
    public void setUser(TrelloUser user) {
        this.user = user;
    }
    
    public String getBoardName() {
        return boardName;
    }
    
    public void setBoardName(String boardName) {
        this.boardName = boardName;
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