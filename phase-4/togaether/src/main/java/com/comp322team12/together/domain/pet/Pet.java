package com.comp322team12.together.domain.pet;

import com.comp322team12.together.domain.User.User;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "PET")
public class Pet {
    @EmbeddedId
    private PetId id;

    @MapsId("USER_ID")
    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "PET_NAME", nullable = false, insertable = false, updatable = false)
    private String petName;

    @Column(name = "SPECIES", nullable = false)
    private String species;

    @Column(name = "GENDER", nullable = false)
    private String gender;

    @Column(name = "AGE", nullable = false)
    private int age;

    @Column(name = "INTRODUCTION")
    private String introduction;

    @Builder
    public Pet(String petName, String species, String gender, Integer age, String introduction) {
        this.petName = petName;
        this.species = species;
        this.gender = gender;
        this.age = age;
        this.introduction = introduction;
    }

}
