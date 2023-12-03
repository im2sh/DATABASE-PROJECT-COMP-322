package com.comp322team12.together.domain;

import com.comp322team12.together.domain.User.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Date;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @Column(name = "R_DATE")
    private Date reservationDate;

    @Column(name = "PRICE")
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "USERS_ID", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "PLACE_ID")
    private Place place;

    @Builder
    public Reservation(Date reservationDate, Integer price, User user, Place place) {
        this.reservationDate = reservationDate;
        this.price = price;
        this.user = user;
        this.place = place;
    }
}
