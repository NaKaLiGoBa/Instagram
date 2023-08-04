package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.domain.User;
import com.nakaligoba.backend.service.UserService;
import com.nakaligoba.backend.service.UserService.UserDto;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@RequestMapping("/api/v1/users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@Valid @RequestBody SignupRequest request) {
        UserDto userDto = UserDto.builder()
                .email(request.email)
                .password(request.password)
                .fullname(request.fullname)
                .username(request.username)
                .build();

        User user = userService.create(userDto);

        return ResponseEntity.ok().build();
    }


    @Data
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    static class SignupRequest {

        @Email
        private String email;

        @NotBlank
        private String password;

        @NotBlank
        @Pattern(regexp = "^[^\\s@]*$")
        private String username;

        @NotBlank
        private String fullname;
    }

}
