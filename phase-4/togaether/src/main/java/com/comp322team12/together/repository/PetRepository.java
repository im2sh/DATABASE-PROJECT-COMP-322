package com.comp322team12.together.repository;

import com.comp322team12.together.domain.pet.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
