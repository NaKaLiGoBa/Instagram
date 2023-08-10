package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.domain.Post;
import com.nakaligoba.backend.service.PostService;
import com.nakaligoba.backend.service.PostService.PostCreateDto;
import com.nakaligoba.backend.service.PostService.PostDeleteDto;
import com.nakaligoba.backend.service.PostService.PostReadDto;
import lombok.RequiredArgsConstructor;
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
        PostCreateDto dto = PostCreateDto.builder()
                .userId(userId)
                .photos(photos)
                .content(content)
                .build();

        Post post = postService.create(dto);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostReadDto> read(@PathVariable Long userId,
                                            @PathVariable Long postId) {
        PostReadDto response = postService.read(userId, postId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> delete(@PathVariable Long userId,
                                    @PathVariable Long postId) {
        PostDeleteDto dto = PostDeleteDto.builder()
                .userId(userId)
                .postId(postId)
                .build();

        postService.delete(dto);
        return ResponseEntity.ok().build();
    }


}
