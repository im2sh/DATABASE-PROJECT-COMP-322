package com.comp322team12.together.domain.contains;

import com.comp322team12.together.domain.Diary;
import com.comp322team12.together.domain.Place;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Contains {
    @EmbeddedId
    private ContainsId id;

    @MapsId("DID")
    @ManyToOne
    @JoinColumn(name = "DID")
    private Diary diary;

    @MapsId("PID")
    @ManyToOne
    @JoinColumn(name = "PID")
    private Place place;

    @Builder
    public Contains(Diary diary, Place place) {
        this.diary = diary;
        this.place = place;
    }
}
