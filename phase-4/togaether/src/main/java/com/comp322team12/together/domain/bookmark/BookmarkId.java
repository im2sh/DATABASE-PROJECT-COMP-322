package com.comp322team12.together.domain.bookmark;

import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.User.User;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class BookmarkId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "PLACE_ID")
    private Place place;

    public BookmarkId(User user, Place place) {
        this.user = user;
        this.place = place;
    }

    public Place getPlace() {
        return place;
    }
}
