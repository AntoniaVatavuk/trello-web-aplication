package com.Trello.Server_side.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "trello_boards")
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
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public TrelloBoard() {}
    
    public TrelloBoard(TrelloUser user, String boardName) {
        this.user = user;
        this.boardName = boardName;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
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