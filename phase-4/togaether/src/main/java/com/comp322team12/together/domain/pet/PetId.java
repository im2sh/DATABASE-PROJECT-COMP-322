package com.comp322team12.together.domain.pet;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class PetId implements Serializable {
    @Column(name = "USERS_ID")
    private Long userId;

    @Column(name="PET_NAME")
    private String petName;
}
