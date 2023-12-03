package com.comp322team12.together.domain;

import com.comp322team12.together.domain.User.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DIARY_SEQ")
    @SequenceGenerator(name = "DIARY_SEQ", sequenceName = "DIARY_SEQ", allocationSize = 1)
    @Column(name = "DIARY_ID", nullable = false)
    private Long id;

    @Column(name = "CONTENT", nullable = false)
    private String content;

    @Column(name = "EMOTION", nullable = false)
    private String emotion;

    @Column(name = "CREATED_DATE", nullable = false)
    private LocalDateTime createdDate;

    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "PLACE_ID")
    private Place place;

    @Builder
    public Diary(String content, String emotion, LocalDateTime createdDate, User user, Place place) {
        this.content = content;
        this.emotion = emotion;
        this.createdDate = createdDate;
        this.user = user;
        this.place = place;
    }

    public Long getId() {
        return id;
    }

}
