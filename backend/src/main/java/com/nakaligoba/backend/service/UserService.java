package com.nakaligoba.backend.service;

import com.nakaligoba.backend.domain.User;
import com.nakaligoba.backend.repository.UserRepository;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User create(UserDto dto) {
        if (userRepository.existsByEmail(dto.email)) {
            throw new IllegalArgumentException("이메일이 중복되었습니다.");
        }

        if (userRepository.existsByUsername(dto.username)) {
            throw new IllegalArgumentException("아이디가 중복되었습니다.");
        }

        User createdUser = User.builder()
                .email(dto.email)
                .username(dto.username)
                .fullName(dto.fullname)
                .password(passwordEncoder.encode(dto.password))
                .build();

        return userRepository.save(createdUser);
    }

    @Data
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    public static class UserDto {
        private String email;
        private String username;
        private String fullname;
        private String password;
    }

}
