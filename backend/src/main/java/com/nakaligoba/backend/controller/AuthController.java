package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Slf4j
@RequestMapping("/api/v1/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<Void> signin(
            @Valid @RequestBody SigninRequest request,
            HttpSession session,
            HttpServletResponse response
    ) {
        if (authService.authenticate(request.id, request.password)) {
            UUID uuid = UUID.randomUUID();
            log.info(uuid.toString());
            session.setAttribute("session_id", uuid);

            Cookie cookie = new Cookie("session_id", uuid.toString());
            cookie.setMaxAge(3600);
            response.addCookie(cookie);
            return ResponseEntity.ok().build();
        }

        throw new IllegalArgumentException("인증 실패");
    }

    @Data
    static class SigninRequest {

        @NotBlank
        private String id;

        @NotBlank
        private String password;
    }
}
