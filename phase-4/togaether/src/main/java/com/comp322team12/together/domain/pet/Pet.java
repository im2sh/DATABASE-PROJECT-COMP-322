package com.comp322team12.together.domain.pet;

import com.comp322team12.together.domain.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.web.WebProperties.Resources.Chain.Strategy;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "PET")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PET_SEQ")
    @SequenceGenerator(name = "PET_SEQ", sequenceName = "PET_SEQ", allocationSize = 1)
    @Column(name = "PET_ID")
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "USERS_ID")
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

    public User getUser() {
        return user;
    }

    public String getPetName() {
        return petName;
    }

    public String getSpecies() {
        return species;
    }

    public String getGender() {
        return gender;
    }

    public int getAge() {
        return age;
    }

    public String getIntroduction() {
        return introduction;
    }
}
