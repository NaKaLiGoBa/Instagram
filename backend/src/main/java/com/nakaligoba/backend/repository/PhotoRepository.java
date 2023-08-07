package com.nakaligoba.backend.repository;

import com.nakaligoba.backend.domain.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    List<Photo> findAllByPostId(Long post_id);

    @Query("DELETE FROM Photo p WHERE p.post.id = ?1")
    @Modifying
    void deleteAllByPostId(Long postId);
}
