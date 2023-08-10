package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.FeedService;
import com.nakaligoba.backend.service.FeedService.FeedDto;
import com.nakaligoba.backend.service.FeedService.FeedsDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/v1/posts")
@RestController
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @GetMapping
    public ResponseEntity<FeedResponse> readFeed(
            @RequestParam Long startPostId
    ) {
        FeedsDto feedsDto = feedService.readFeeds(startPostId);
        FeedResponse response = FeedResponse.of(feedsDto);
        return ResponseEntity.ok(response);
    }


    @Data
    @AllArgsConstructor
    private static class FeedResponse {
        List<FeedDto> posts;
        Long nextPostId;

        static FeedResponse of(FeedsDto feedsDto) {
            return new FeedResponse(feedsDto.getPosts(), feedsDto.getNextPostId());
        }
    }
}
