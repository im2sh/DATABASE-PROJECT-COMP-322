package com.comp322team12.together.domain.contains;

import com.comp322team12.together.domain.Diary;
import com.comp322team12.together.domain.Place;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@EqualsAndHashCode
public class ContainsId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "DID")
    private Diary diary;

    @ManyToOne
    @JoinColumn(name = "PID")
    private Place place;
}
