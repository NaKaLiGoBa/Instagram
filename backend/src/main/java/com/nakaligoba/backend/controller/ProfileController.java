package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.ProfileService;
import com.nakaligoba.backend.service.ProfileService.*;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RequestMapping("/api/v1/users")
@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/{id}")
    public ProfileResponse get(@PathVariable Long id) {

        ProfileDto profile = profileService.getProfile(id);

        return ProfileResponse.builder()
                .username(profile.getUsername())
                .description(profile.getDescription())
                .imageUrl(profile.getImageUrl())
                .posts(profile.getPosts())
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> put(@PathVariable Long id,
                                    @RequestBody ProfileRequest profileRequest) {

        ProfileDto updatedProfile = profileService.putProfile(id, profileRequest);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/image")
    public ResponseEntity<Void> putImage(@PathVariable Long id,
                                    @RequestParam MultipartFile image) {

        ProfileDto dto = ProfileDto.builder()
                .userId(id)
                .image(image)
                .build();

        profileService.putImage(dto);

        return ResponseEntity.ok().build();

    }

    @DeleteMapping("/{id}/image")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {

        ProfileDto dto = ProfileDto.builder()
                .userId(id)
                .build();

        profileService.deleteImage(dto);

        return ResponseEntity.ok().build();
    }

    @Data
    @Builder
    static class ProfileResponse {
        private String username;
        private String description;
        private String imageUrl;
        private List<UserPostDto> posts;
    }

    @Data
    @Builder
    public static class ProfileRequest {
        private String username;
        private String description;
    }

}
