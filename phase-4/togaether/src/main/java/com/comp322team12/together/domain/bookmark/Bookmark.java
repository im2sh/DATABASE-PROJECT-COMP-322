package com.comp322team12.together.domain.bookmark;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "CONTAINS")
public class Bookmark {
    @EmbeddedId
    private BookmarkId id;

    @Column(name = "STATUS", nullable = false)
    private Integer status;

    public Bookmark(BookmarkId id, Integer status) {
        this.id = id;
        this.status = status;
    }
}
