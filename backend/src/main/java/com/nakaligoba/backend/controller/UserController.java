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

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResult> handleBadRequest(IllegalArgumentException ex) {
        ErrorResult errorResult = new ErrorResult(ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResult);
    }

    @Data
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    static class SignupRequest {

        @Email(message = "이메일 형식을 지켜야 합니다.")
        private String email;

        @NotBlank(message = "비밀번호를 입력해야 합니다.")
        private String password;

        @NotBlank
        @Pattern(regexp = "^[^\\s@]*$", message = "사용자 이름에 @을 포함시킬 수 없습니다.")
        private String username;

        @NotBlank(message = "성명을 입력해야 합니다.")
        private String fullname;
    }

    private static class ErrorResult {
        private String message;

        public ErrorResult(String message) {
            this.message = message;
        }
    }
}
