package com.Trello.Server_side.models;

import java.util.Calendar;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "trello_cards")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TrelloCard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private int cardId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "list_id", nullable = false)
    private TrelloList list;
    
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;
    
    @Column(name = "position", nullable = false)
    private Integer position;

    @Column(name = "due_date")
    private Date dueDate;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;
    
    public TrelloCard() {}

    public TrelloCard(TrelloList list, String name, String description, Integer position, Date dueDate) {
        this.list = list;
        this.name = name;
        this.description = description;
        this.position = position;
        this.dueDate = dueDate;
        this.createdAt = Calendar.getInstance().getTime();
        this.updatedAt = Calendar.getInstance().getTime();;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public TrelloList getList() {
        return list;
    }

    public void setList(TrelloList list) {
        this.list = list;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
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
//    public List<Comment> getComments() {
//        return comments;
//    }

//    public void setComments(List<Comment> comments) {
//        this.comments = comments;
//    }

//    public void addComment(Comment comment) {
//        if (comments == null) {
//            comments = new ArrayList<>();
//        }
//        comments.add(comment);
//        comment.setCard(this);
//    }
}