package com.nakaligoba.backend.service;

import com.nakaligoba.backend.domain.Photo;
import com.nakaligoba.backend.domain.Post;
import com.nakaligoba.backend.domain.User;
import com.nakaligoba.backend.repository.PostRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedService {

    private static final PageRequest RECENTLY_POST_REQUEST = PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"));

    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public FeedsDto readFeeds(Long startPostId) {
        Slice<Post> posts = postRepository.findByIdLessThanOrderByIdDesc(startPostId, RECENTLY_POST_REQUEST);
        List<FeedDto> feeds = posts.stream()
                .map(FeedDto::of)
                .collect(Collectors.toList());
        Long nextPostId = getNextPostId(posts);
        return FeedsDto.builder()
                .posts(feeds)
                .nextPostId(nextPostId)
                .build();
    }

    private Long getNextPostId(Slice<Post> posts) {
        if (posts.hasNext()) {
            return posts.stream()
                    .map(Post::getId)
                    .min(Long::compareTo)
                    .orElse(null);
        }

        return -1L;
    }

    @Data
    @Builder
    @AllArgsConstructor
    public static class FeedsDto {
        List<FeedDto> posts;
        Long nextPostId;
    }

    @Data
    @Builder
    @AllArgsConstructor
    public static class FeedDto {
        private Long id;
        private UserDto user;
        private List<PhotoDto> photos;
        private String content;
        private LocalDateTime createAt;

        private static FeedDto of(Post post) {
            return FeedDto.builder()
                    .id(post.getId())
                    .user(
                            UserDto.of(post.getUser())
                    )
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
    }

    @Data
    @AllArgsConstructor
    static class UserDto {
        private Long id;
        private String username;
        private String profileImage;

        private static UserDto of(User user) {
            return new UserDto(user.getId(), user.getUsername(), null);
        }
    }

    @Data
    @AllArgsConstructor
    static class PhotoDto {
        private Long id;
        private String url;

        private static PhotoDto of(Photo photo) {
            return new PhotoDto(photo.getId(), photo.getUrl());
        }
    }
}
