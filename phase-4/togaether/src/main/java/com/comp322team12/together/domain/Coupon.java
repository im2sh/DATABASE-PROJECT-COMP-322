package com.comp322team12.together.domain;

import com.comp322team12.together.domain.User.User;
import com.comp322team12.together.domain.constants.Category;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COUPON_ID")
    private Long id;

    @Column(name = "COUPON_NAME", nullable = false)
    private String couponName;

    @Column(name = "DISCOUNT_RATE", nullable = false)
    private double discountRate;

    @Column(name="CATEGORY")
    @Enumerated(EnumType.ORDINAL)
    private Category category;

    @Column(name = "EXPIRED_DATE", nullable = false)
    private Date expiredDate;

    @Column(name = "MAXIMUM", nullable = false)
    private Integer maximum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USERS_ID")
    private User user;

    @Builder
    public Coupon(String couponName, double discountRate, Category category, Date expiredDate, Integer maximum,
                  User user) {
        this.couponName = couponName;
        this.discountRate = discountRate;
        this.category = category;
        this.expiredDate = expiredDate;
        this.maximum = maximum;
        this.user = user;
    }
}
