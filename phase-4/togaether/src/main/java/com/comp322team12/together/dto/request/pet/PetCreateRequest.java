package com.comp322team12.together.dto.request.pet;

public record PetCreateRequest(String petName, String species, String gender, int age, String introduction) {
}
