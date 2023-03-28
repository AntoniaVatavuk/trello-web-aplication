package com.Trello.Server_side.services;

import java.util.Calendar;

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

    public TrelloUser createUser(TrelloUser user) {
    	user.setCreatedAt(Calendar.getInstance().getTime());
    	user.setUpdatedAt(Calendar.getInstance().getTime());
        return trelloUserRepository.save(user);
    }
    
    public TrelloUser updateUser(int userId, TrelloUser updatedUser) {
    	TrelloUser existingUser = getUserById(userId);
        if (existingUser == null) {
            return null;
        }
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setFullName(updatedUser.getFullName());
        existingUser.setUpdatedAt(Calendar.getInstance().getTime());
        return trelloUserRepository.save(existingUser);
    }
	    
	public void deleteUser(int userId) {
    	TrelloUser existingUser = getUserById(userId);
    	trelloUserRepository.delete(existingUser);
	}
}
