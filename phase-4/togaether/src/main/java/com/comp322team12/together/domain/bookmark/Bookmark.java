package com.comp322team12.together.domain.bookmark;

import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.User.User;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "BOOKMARK")
public class Bookmark {
    @EmbeddedId
    private BookmarkId id;

    @Column(name = "STATUS", nullable = false)
    private Integer status;

    @ManyToOne
    @JoinColumn(name = "USERS_ID", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "PLACE_ID", insertable = false, updatable = false)
    private Place place;

    public Bookmark(BookmarkId id, Integer status) {
        this.id = id;
        this.status = status;
    }

    public BookmarkId getId() {
        return id;
    }
}
