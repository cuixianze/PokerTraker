package com.example.poker_traker.poker_traker.Web;


import com.example.poker_traker.poker_traker.Entity.UserDetailDTO;
import com.example.poker_traker.poker_traker.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint to retrieve user details by username
    @GetMapping("/{username}/details")
    public ResponseEntity<UserDetailDTO> getUserDetails(@PathVariable String username) {
        UserDetailDTO userDetails = userService.getUserDetails(username);
        return ResponseEntity.ok(userDetails);
    }
}
