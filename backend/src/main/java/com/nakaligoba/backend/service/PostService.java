package com.nakaligoba.backend.service;

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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {

    private final AwsS3Service awsS3Service;
    private final PhotoRepository photoRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Transactional
    public Post create(PostCreateDto dto) {
        User user = queryAndGetUser(dto.userId);
        Post post = savePostWithoutPhotos(user, dto.content);

        // Create and associate the Photo objects with Post object
        List<Photo> photos = new ArrayList<>();
        List<String> photoURLs = awsS3Service.uploadAllAndGetUrls(dto.getPhotos());
        for (String url : photoURLs) {
            Photo createdPhoto = Photo.builder()
                    .url(url)
                    .post(post)
                    .build();
            photos.add(createdPhoto);
        }

        // Save the photos
        photoRepository.saveAll(photos);

        // (optional) post 내에 photos 저장

        return post;
    }

    @Transactional(readOnly = true)
    public PostReadDto read(Long userId, Long postId) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 아이디의 유저가 존재하지 않습니다 ID: " + userId));
        Post post = author.getPosts()
                .stream()
                .filter(p -> p.getId().equals(postId))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("해당 포스트가 존재하지 않습니다 ID: " + postId));
        return PostReadDto.of(post);
    }

    @Transactional
    public void delete(PostDeleteDto dto) {
        Post targetPost = queryAndGetPost(dto.postId);
        Long userIdFromTargetPost = targetPost.getUser().getId();

        if (!dto.userId.equals(userIdFromTargetPost)) {
            throw new IllegalArgumentException("유저가 일치하지 않습니다");
        }

        List<Photo> photos = photoRepository.findAllByPostId(dto.postId);
        List<String> urls = getUrls(photos);
        awsS3Service.deleteAllByUrlsAtOnce(urls);
        photoRepository.deleteAllByPostId(dto.postId);
        postRepository.deleteById(dto.postId);
    }

    private List<String> getUrls(List<Photo> photos) {
        return photos.stream().map(Photo::getUrl).collect(Collectors.toList());
    }

    private Post savePostWithoutPhotos(User user, String content) {
        Post post = Post.builder()
                .content(content)
                .user(user)
                .build();
        post = postRepository.save(post);
        return post;
    }

    private User queryAndGetUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다"));
    }

    private Post queryAndGetPost(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 포스트입니다"));
    }


    @Data
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    public static class PostCreateDto {
        private Long userId;
        private List<MultipartFile> photos;
        private String content;
    }

    @Data
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    public static class PostReadDto {
        private Long id;
        private UserDto user;
        private List<PhotoDto> photos;
        private String content;
        private LocalDateTime createAt;

        private static PostReadDto of(Post post) {
            return PostReadDto.builder()
                    .id(post.getId())
                    .user(UserDto.of(post.getUser()))
                    .photos(
                            post.getPhotos()
                                    .stream()
                                    .map(PhotoDto::of)
                                    .collect(Collectors.toList())
                    )
                    .content(post.getContent())
                    .createAt(post.getCreatedAt())
                    .build();
        }

        @Data
        @Builder
        @AllArgsConstructor
        private static class UserDto {
            private Long id;
            private String username;
            private String profileImage;

            private static UserDto of(User user) {
                return UserDto.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .profileImage(user.getImageUrl())
                        .build();
            }
        }

        @Data
        @Builder
        @AllArgsConstructor
        private static class PhotoDto {
            private Long id;
            private String url;

            private static PhotoDto of(Photo photo) {
                return PhotoDto.builder()
                        .id(photo.getId())
                        .url(photo.getUrl())
                        .build();
            }
        }
    }

    @Data
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    public static class PostDeleteDto {
        private Long userId;
        private Long postId;
    }
}

