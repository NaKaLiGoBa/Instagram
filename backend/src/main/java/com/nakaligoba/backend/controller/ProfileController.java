package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.ProfileService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/v1/users")
@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/{id}")
    public ProfileResponse get(@PathVariable Long id) {

        ProfileService.ProfileDto profile = profileService.getProfile(id);

        return ProfileResponse.builder()
                .username(profile.getUsername())
                .description(profile.getDescription())
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> put(@PathVariable Long id, @RequestBody ProfileRequest profileRequest) {

        ProfileService.ProfileDto updatedProfile = profileService.putProfile(id, profileRequest);

        return ResponseEntity.ok().build();
    }

    @Data
    static class ProfileResponse {
        private String username;
        private String description;

        @Builder
        public ProfileResponse(String username, String description) {
            this.username = username;
            this.description = description;
        }
    }

    @Data
    public static class ProfileRequest {
        private String username;
        private String description;

        @Builder
        public ProfileRequest(String username, String description) {
            this.username = username;
            this.description = description;
        }
    }

}
