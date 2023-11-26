package com.comp322team12.together.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REVIEW_ID")
    private Long id;

    @Column(name = "RATING", nullable = false)
    private Integer rating;

    @Column(name = "CONTENT", nullable = false)
    private String content;

    @Column(name = "CREATE_DATE", nullable = false)
    private LocalDateTime createdDate;

    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "PLACE_ID")
    private Place place;

    @Builder
    public Review(Integer rating, String content, LocalDateTime createdDate, User user, Place place) {
        this.rating = rating;
        this.content = content;
        this.createdDate = createdDate;
        this.user = user;
        this.place = place;
    }
}
