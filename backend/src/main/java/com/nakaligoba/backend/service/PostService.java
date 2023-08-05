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

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PostService {

    private final AwsS3Service awsS3Service;
    private final PhotoRepository photoRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Transactional
    public Post create(PostDto dto) {
        User user = queryAndGetUser(dto);
        Post post = savePostWithoutPhotos(dto, user);

        // Create and associate the Photo objects with Post object
        List<Photo> photos = new ArrayList<>();
        List<String> photoURLs = awsS3Service.uploadPhotosAndGetUrls(dto.getPhotos());
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

    private Post savePostWithoutPhotos(PostDto dto, User user) {
        Post post = Post.builder()
                .content(dto.content)
                .user(user)
                .build();
        post = postRepository.save(post);
        return post;
    }

    private User queryAndGetUser(PostDto dto) {
        return userRepository.findById(dto.userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다"));
    }

    @Data
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    public static class PostDto {
        private Long userId;
        private MultipartFile[] photos;
        private String content;
    }
}

