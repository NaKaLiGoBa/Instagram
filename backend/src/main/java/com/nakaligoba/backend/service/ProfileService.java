package com.nakaligoba.backend.service;

import com.nakaligoba.backend.controller.ProfileController.*;
import com.nakaligoba.backend.domain.Photo;
import com.nakaligoba.backend.domain.Post;
import com.nakaligoba.backend.domain.User;
import com.nakaligoba.backend.repository.PhotoRepository;
import com.nakaligoba.backend.repository.PostRepository;
import com.nakaligoba.backend.repository.UserRepository;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final AwsS3Service awsS3Service;

    @Transactional(readOnly = true)
    public ProfileDto getProfile(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(IllegalArgumentException::new);

        List<Post> userPosts = postRepository.findByUserId(id);

        // Post를 UserPostDto객체로 변환
        List<UserPostDto> userPostDtos = convertPostsToUserPostDto(userPosts);

        return ProfileDto.builder()
                .username(user.getUsername())
                .description(user.getDescription())
                .imageUrl(user.getImageUrl())
                .posts(userPostDtos)
                .build();
    }

    private List<UserPostDto> convertPostsToUserPostDto(List<Post> userPosts) {
        return userPosts.stream().map(post -> {
            List<String> photoUrls = post.getPhotos().stream()
                    .map(Photo::getUrl)
                    .collect(Collectors.toList());

            String firstPhotoUrl = photoUrls.stream()
                    .findFirst()
                    .orElse(null);

            return UserPostDto.builder()
                    .postId(post.getId())
                    .content(post.getContent())
                    .photoUrl(photoUrls)
                    .firstPhotoUrl(firstPhotoUrl)
                    .build();
        }).collect(Collectors.toList());
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

    @Transactional
    public void putImage(ProfileDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다"));

        try {
            String imageUrl = awsS3Service.uploadAndGetUrl(dto.getImage());
            user.changeImageUrl(imageUrl);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void deleteImage(ProfileDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다"));

        String url = user.getImageUrl();
        awsS3Service.deleteByUrl(url);
        user.changeImageUrl(null);
    }

    @Data
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ProfileDto {
        private Long userId;
        private String username;
        private String description;
        private List<UserPostDto> posts;
        private String imageUrl;
        private MultipartFile image;
    }

    @Data
    @Builder
    public static class UserPostDto {
        private Long postId;
        private String content;
        private String firstPhotoUrl;
        private List<String> photoUrl;
    }
}
