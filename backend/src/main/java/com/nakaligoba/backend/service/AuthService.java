package com.nakaligoba.backend.service;

import com.nakaligoba.backend.domain.User;
import com.nakaligoba.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean authenticate(String id, String password) {
        if (isEmail(id)) {
            return authenticateByEmail(id, password);
        }
        return authenticateByUsername(id, password);
    }

    private static boolean isEmail(String id) {
        return id.contains("@");
    }

    private boolean authenticateByEmail(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일의 유저가 존재하지 않습니다."));

        return matchPassword(user, password);
    }

    private boolean authenticateByUsername(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자 아이디의 유저가 존재하지 않습니다."));

        return matchPassword(user, password);
    }

    private boolean matchPassword(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }
}
