package com.comp322team12.together.domain.bookmark;

import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.User.User;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class BookmarkId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "USERS_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "PLACE_ID")
    private Place place;

    public Place getPlace() {
        return place;
    }
}
