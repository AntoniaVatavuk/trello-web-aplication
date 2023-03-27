package com.Trello.Server_side.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Trello.Server_side.models.TrelloUser;
import com.Trello.Server_side.repositories.TrelloUserRepository;

@Service
public class TrelloUserService {

    @Autowired
    private TrelloUserRepository trelloUserRepository;
    
    public TrelloUser getUserById(int userId) {
        return trelloUserRepository.findById(userId).orElse(null);
    }

    public TrelloUser getUserByEmail(String email) {
        return trelloUserRepository.findByEmail(email);
    }

    public TrelloUser getUserByUsername(String username) {
        return trelloUserRepository.findByUsername(username);
    }

    public TrelloUser createUser(TrelloUser trelloUser) {
    	trelloUser.setCreatedAt(LocalDateTime.now());
    	trelloUser.setUpdatedAt(LocalDateTime.now());
        return trelloUserRepository.save(trelloUser);
    }
	
//    public List<TrelloUser> getAllUsers() {
//        return trelloUserRepository.findAll();
//    }
//
//    public TrelloUser getUserByUsername(String username) {
//        return trelloUserRepository.findByUsername(username);
//    }
//
//    public TrelloUser updateUser(int trelloUserId, TrelloUser updatedUser) {
//    	TrelloUser existingUser = trelloUserRepository.findById(trelloUserId).orElse(null);
//        if (existingUser == null) {
//            return null;
//        }
//        existingUser.setUsername(updatedUser.getUsername());
//        existingUser.setEmail(updatedUser.getEmail());
//        existingUser.setPassword(updatedUser.getPassword());
//        existingUser.setFullName(updatedUser.getFullName());
//        existingUser.setUpdatedAt(LocalDateTime.now());
//        return trelloUserRepository.save(existingUser);
//    }
//
//    public void deleteUser(int trelloUserId) {
//    	trelloUserRepository.deleteById(trelloUserId);
////    	trelloUserRepository.deleteByUserId(trelloUserId);
//    }
}
