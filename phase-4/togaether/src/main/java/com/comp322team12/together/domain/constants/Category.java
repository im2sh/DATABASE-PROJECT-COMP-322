package com.comp322team12.together.domain.constants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Category {
    CAFE("CAFE"),
    BAR("BAR"),
    DINING("DINING");

    @Getter
    private final String type;
}
