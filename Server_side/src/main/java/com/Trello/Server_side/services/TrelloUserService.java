package com.Trello.Server_side.services;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Trello.Server_side.models.TrelloBoard;
import com.Trello.Server_side.models.TrelloUser;
import com.Trello.Server_side.repositories.TrelloUserRepository;

@Service
public class TrelloUserService {

    @Autowired
    private TrelloUserRepository trelloUserRepository;
    @Autowired
	private TrelloBoardService trelloBoardService;
    
    public TrelloUser getUserById(int userId) {
        return trelloUserRepository.findById(userId).orElse(null);
    }

    public TrelloUser getUserByEmail(String email) {
        return trelloUserRepository.findByEmail(email);
    }
    
     public TrelloUser checkUser(String userEmail, String userPassword) {
     	TrelloUser existingUser = getUserByEmail(userEmail);
     	if(existingUser.getEmail().equals(userEmail) && existingUser.getPassword().equals(userPassword)) {
     		return existingUser;
     	}
     	return null;
     }
     
     public TrelloUser createUser(TrelloUser user) {
    	 user.setPassword(user.getPassword());
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
    	List<TrelloBoard> userBoards = trelloBoardService.getAllBoardsByUserId(userId);
    	for (TrelloBoard board : userBoards) {
    		trelloBoardService.deleteBoard(board.getBoardId());
		}
    	trelloUserRepository.deleteById(userId);
	}
}
