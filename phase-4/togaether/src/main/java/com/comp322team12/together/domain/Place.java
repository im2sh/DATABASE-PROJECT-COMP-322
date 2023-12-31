package com.comp322team12.together.domain;

import com.comp322team12.together.domain.bookmark.Bookmark;
import com.comp322team12.together.domain.constants.Category;
import com.comp322team12.together.dto.response.place.PlaceResponse;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PLACE_ID")
    private Long id;
    @Column(name = "PLACE_NAME", nullable = false)
    private String placeName;
    @Column(name = "CATEGORY", nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;
    @Column(name = "CITY", nullable = false)
    private String city;
    @Column(name = "DETAIL_ADDRESS", nullable = false)
    private String detailAddress;
    @Column(name = "LATITUDE", nullable = false)
    private double latitude;
    @Column(name = "LONGITUDE", nullable = false)
    private double longitude;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Reservation> reservationList = new ArrayList<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Event> eventList = new ArrayList<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Diary> diaries = new ArrayList<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Bookmark> bookmarks = new ArrayList<>();


    @Builder
    public Place(String placeName, Category category, String city, String detailAddress, double latitude,
                 double longitude) {
        this.placeName = placeName;
        this.category = category;
        this.city = city;
        this.detailAddress = detailAddress;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public PlaceResponse toResponse() {
        return new PlaceResponse(id, placeName, category.getType(), city, detailAddress, latitude, longitude);
    }

    public double getAverageRating() {
        int sum = 0;
        for (Review review : reviewList) {
            sum += review.getRating();
        }
        if (sum == 0) {
            return 0;
        }
        return sum / reviewList.size();
    }

    public void addDiary(Diary diary) {
        this.diaries.add(diary);
    }

    public Long getPlaceId() {
        return id;
    }

    public Long getId() {
        return id;
    }

    public String getPlaceName() {
        return placeName;
    }

    public Category getCategory() {
        return category;
    }

    public String getCity() {
        return city;
    }

    public String getDetailAddress() {
        return detailAddress;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public int getReviewCount() {
        return reviewList.size();
    }

    public int getBookmarkCount() {
        int size = 0;
        for (Bookmark bookmark : bookmarks) {
            if (bookmark.getStatus() == 1) {
                size++;
            }
        }
        return size;
    }
}
