package com.nakaligoba.backend.repository;

import com.nakaligoba.backend.domain.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Slice<Post> findByIdLessThanOrderByIdDesc(Long startPostId, Pageable pageable);
}
