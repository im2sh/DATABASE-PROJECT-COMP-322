package com.comp322team12.together.domain.bookmark;

import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.User.User;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jdk.jshell.Snippet;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USERS_ID", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PLACE_ID", insertable = false, updatable = false)
    private Place place;

    public Bookmark(BookmarkId id, Integer status) {
        this.id = id;
        this.status = status;
    }

    public BookmarkId getId() {
        return id;
    }

    public Integer getStatus() {
        return status;
    }

    public void changeStatus() {
        if(status == 1)
            this.status = 0;
        else if(status == 0)
            this.status = 1;
    }
}
