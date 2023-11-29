package com.comp322team12.together.dto.response.place;

public record PlaceResponse(String placeName, String category, String city, String detailAddress, double latitude,
                            double longitude) {
}
