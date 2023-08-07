package com.nakaligoba.backend.service;

import com.nakaligoba.backend.controller.ProfileController.*;
import com.nakaligoba.backend.domain.User;
import com.nakaligoba.backend.repository.UserRepository;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public ProfileDto getProfile(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);

        return ProfileDto.builder()
                .username(user.getUsername())
                .description(user.getDescription())
                .build();
    }

    @Transactional
    public ProfileDto putProfile(Long id, ProfileRequest profileRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);

        user.changeUsername(profileRequest.getUsername());
        user.changeDescription(profileRequest.getDescription());

        userRepository.save(user);

        return ProfileDto.builder()
                .username(user.getUsername())
                .description(user.getDescription())
                .build();
    }

    @Data
    public static class ProfileDto {
        private String username;
        private String description;

        @Builder
        public ProfileDto(String username, String description) {
            this.username = username;
            this.description = description;
        }
    }
}
