package com.nakaligoba.backend.repository;

import com.nakaligoba.backend.config.JpaConfig;
import com.nakaligoba.backend.domain.Post;
import com.nakaligoba.backend.domain.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.jdbc.Sql;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(JpaConfig.class)
@Sql("/db/data.sql")
class PostRepositoryTest {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @DisplayName("페이징 요청보다 포스트의 개수가 적을 때 남은 모든 포스트를 반환한다.")
    @Test
    void givenPostsLessThanPageRequest_whenFindAllLessThanOrderByIdDesc_thenReturnSlice() {
        List<User> users = userRepository.findAll();
        PageRequest request = PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"));
        Post givenPost1 = Post.builder()
                .content("안녕하세요111")
                .user(users.get(0))
                .build();
        Post givenPost2 = Post.builder()
                .content("안녕하세요222")
                .user(users.get(1))
                .build();
        Post givenPost3 = Post.builder()
                .content("안녕하세요333")
                .user(users.get(2))
                .build();
        postRepository.save(givenPost1);
        postRepository.save(givenPost2);
        postRepository.save(givenPost3);

        Slice<Post> posts = postRepository.findByIdLessThanOrderByIdDesc(Long.MAX_VALUE, request);

        assertThat(posts.hasNext()).isFalse();
        assertThat(posts.getNumberOfElements()).isEqualTo(3);
        List<Long> postList = posts.stream()
                .map(Post::getId)
                .collect(Collectors.toList());
        List<Long> collect = Stream.of(givenPost3, givenPost2, givenPost1)
                .map(Post::getId)
                .collect(Collectors.toList());
        assertThat(postList).isEqualTo(collect);
    }

    @DisplayName("페이징 요청보다 포스트 개수가 많을 때 요청한 개수만큼 포스트를 반환한다.")
    @Test
    void givenPostsMoreThanPageRequest_whenFindAllLessThanOrderByIdDesc_thenReturnSlice() {
        List<User> users = userRepository.findAll();
        PageRequest request = PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"));
        Post givenPost1 = Post.builder()
                .content("안녕하세요111")
                .user(users.get(0))
                .build();
        Post givenPost2 = Post.builder()
                .content("안녕하세요222")
                .user(users.get(1))
                .build();
        Post givenPost3 = Post.builder()
                .content("안녕하세요333")
                .user(users.get(2))
                .build();
        Post givenPost4 = Post.builder()
                .content("안녕하세요333")
                .user(users.get(2))
                .build();
        Post givenPost5 = Post.builder()
                .content("안녕하세요333")
                .user(users.get(2))
                .build();
        Post givenPost6 = Post.builder()
                .content("안녕하세요333")
                .user(users.get(2))
                .build();
        postRepository.save(givenPost1);
        postRepository.save(givenPost2);
        postRepository.save(givenPost3);
        postRepository.save(givenPost4);
        postRepository.save(givenPost5);
        postRepository.save(givenPost6);

        Slice<Post> posts = postRepository.findByIdLessThanOrderByIdDesc(Long.MAX_VALUE, request);

        assertThat(posts.hasNext()).isTrue();
        assertThat(posts.getNumberOfElements()).isEqualTo(5);
        List<Long> postList = posts.stream()
                .map(Post::getId)
                .collect(Collectors.toList());
        List<Long> collect = Stream.of(givenPost6, givenPost5, givenPost4, givenPost3, givenPost2)
                .map(Post::getId)
                .collect(Collectors.toList());
        assertThat(postList).isEqualTo(collect);
    }
}
