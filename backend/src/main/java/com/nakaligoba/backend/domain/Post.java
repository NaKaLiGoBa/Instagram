package com.nakaligoba.backend.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "content", nullable = true)
    private String content;

    @OneToMany(mappedBy = "post")
    @Column(name = "photos", nullable = false)
    private List<Photo> photos;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Builder
    public Post(String content, List<Photo> photos) {
        this.content = content;
        this.photos = photos;
    }

}
