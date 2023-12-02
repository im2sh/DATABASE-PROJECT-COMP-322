package com.comp322team12.together.dto.response.pet;

import com.comp322team12.together.domain.User.User;

public record PetResponse(String petName, String species, String Gender, Integer age, String introduction){
}
