package com.nakaligoba.backend.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Table(name = "users")
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "fullname", nullable = false)
    private String fullname;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "user")
    @Column(name = "posts")
    private List<Post> posts;

    @Builder
    public User(String email, String password, String fullName, String username) {
        this.email = email;
        this.password = password;
        this.fullname = fullName;
        this.username = username;
    }

    public void changeUsername(String username) {
        this.username = username;
    }
    public void changeDescription(String description) {
        this.description = description;
    }

    public void changeImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


}
