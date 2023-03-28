package com.Trello.Server_side.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Trello.Server_side.models.TrelloUser;
import com.Trello.Server_side.services.TrelloUserService;

@RestController
@RequestMapping("/api/users")
public class TrelloUserController {

    @Autowired
    private TrelloUserService trelloUserService;
    
    // get user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<TrelloUser> getUserById(@PathVariable int userId) {
    	TrelloUser user = trelloUserService.getUserById(userId);
    	if (user == null) {
    		return ResponseEntity.notFound().build();
    	}
    	return ResponseEntity.ok(user);
    }
    
    // check user with this email exists and that the password is correct
    @GetMapping("/login/{email}/{password}")
    public ResponseEntity<TrelloUser> checkUser(@PathVariable String email, @PathVariable String password) {
    	TrelloUser user = trelloUserService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        if (user.getPassword().equals(password)) {
            return ResponseEntity.ok(user);
		}
        return null;
    }
    
    // create new user
    @PostMapping
    public ResponseEntity<TrelloUser> createUser(@RequestBody TrelloUser user) {
    	TrelloUser createdUser = trelloUserService.createUser(user);
    	return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    
    // update existing user
	@PutMapping("/{userId}")
	public ResponseEntity<TrelloUser> updateUser(@PathVariable int userId, @RequestBody TrelloUser user) {
	  	TrelloUser updatedUser = trelloUserService.updateUser(userId, user);
	  	if (updatedUser == null) {
	  		return ResponseEntity.notFound().build();
	  	}
	  	return ResponseEntity.ok(updatedUser);
	}
	
    // delete user
	@DeleteMapping("/{userId}")
	public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
	  	trelloUserService.deleteUser(userId);
	    return ResponseEntity.noContent().build();
	}
 
//    @GetMapping("/email/{email}")
//    public ResponseEntity<TrelloUser> getUserByEmail(@PathVariable String email) {
//    	TrelloUser user = trelloUserService.getUserByEmail(email);
//        if (user == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(user);
//    }
}
