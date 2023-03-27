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
    
    @GetMapping("/{userId}")
    public ResponseEntity<TrelloUser> getUserById(@PathVariable int userId) {
    	TrelloUser trelloUser = trelloUserService.getUserById(userId);
    	if (trelloUser == null) {
    		return ResponseEntity.notFound().build();
    	}
    	return ResponseEntity.ok(trelloUser);
    }
    
    @GetMapping("/username/{username}/{testvar}")
    public ResponseEntity<TrelloUser> getUserByUsername(@PathVariable String username, @PathVariable String testvar) {
    	TrelloUser trelloUser = trelloUserService.getUserByUsername(username);
    	if (trelloUser == null) {
    		return ResponseEntity.notFound().build();
    	}
    	return ResponseEntity.ok(trelloUser);
    }
    
    // check user with this email exists and that the password is correct
    @GetMapping("/login/{email}/{password}")
    public ResponseEntity<TrelloUser> checkUser(@PathVariable String email, @PathVariable String password) {
    	TrelloUser trelloUser = trelloUserService.getUserByEmail(email);
        if (trelloUser == null) {
            return ResponseEntity.notFound().build();
        }
        if (trelloUser.getPassword().equals(password)) {
            return ResponseEntity.ok(trelloUser);
		}
        return null;
//        return ResponseEntity.ok(trelloUser);
    }
    
//    // check user with this email exists and that the password is correct
//    @GetMapping("/login/{username}/{password}")
//    public ResponseEntity<TrelloUser> checkUserByUsername(@PathVariable String username, @PathVariable String password) {
//    	TrelloUser trelloUser = trelloUserService.getUserByUsername(username);
//        if (trelloUser == null) {
//            return ResponseEntity.notFound().build();
//        }
////        if (trelloUser.getPassword() == password) {
////            return ResponseEntity.ok(trelloUser);
////		}
//        return null;
//    }
    
    @PostMapping
    public ResponseEntity<TrelloUser> createUser(@RequestBody TrelloUser user) {
    	TrelloUser createdUser = trelloUserService.createUser(user);
    	return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    
//    @GetMapping("/")
//    public ResponseEntity<List<TrelloUser>> getAllUsers() {
//        List<TrelloUser> users = trelloUserService.getAllUsers();
//        if (users.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(users);
//    }
//
//    
//    @GetMapping("/email/{email}")
//    public ResponseEntity<TrelloUser> getUserByEmail(@PathVariable String email) {
//    	TrelloUser user = trelloUserService.getUserByEmail(email);
//        if (user == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(user);
//    }
//
//    @GetMapping("/username/{username}")
//    public ResponseEntity<TrelloUser> getUserByUsername(@PathVariable String username) {
//    	TrelloUser trelloUser = trelloUserService.getUserByUsername(username);
//        if (trelloUser == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(trelloUser);
//    }
//
//    
//    
//
//    @PutMapping("/{userId}")
//    public ResponseEntity<TrelloUser> updateUser(@PathVariable int userId, @RequestBody TrelloUser user) {
//    	TrelloUser updatedUser = trelloUserService.updateUser(userId, user);
//        if (updatedUser == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(updatedUser);
//    }
//
//    @DeleteMapping("/{userId}")
//    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
//    	trelloUserService.deleteUser(userId);
//        return ResponseEntity.noContent().build();
//    }
}
