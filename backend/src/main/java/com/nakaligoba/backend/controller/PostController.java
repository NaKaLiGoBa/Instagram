package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.domain.Post;
import com.nakaligoba.backend.service.PostService;
import com.nakaligoba.backend.service.PostService.PostDto;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/api/v1/users/{userId}/posts")
@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;


    @PostMapping
    public ResponseEntity<?> create(@PathVariable Long userId,
                                    @RequestParam("photos") List<MultipartFile> photos,
                                    @RequestParam("content") String content) {
        PostDto postDto = PostDto.builder()
                .userId(userId)
                .photos(photos)
                .content(content)
                .build();

        Post post = postService.create(postDto);

        return ResponseEntity.ok().build();
    }
}
