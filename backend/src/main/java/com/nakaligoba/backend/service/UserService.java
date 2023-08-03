package com.nakaligoba.backend.service;

import com.nakaligoba.backend.domain.User;
import com.nakaligoba.backend.repository.UserRepository;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User create(UserDto dto) {
        User createdUser = User.builder()
                .email(dto.email)
                .username(dto.username)
                .fullName(dto.fullname)
                .password(dto.password)
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
