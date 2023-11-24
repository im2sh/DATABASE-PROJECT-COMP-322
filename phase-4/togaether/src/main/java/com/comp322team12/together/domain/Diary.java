package com.comp322team12.together.domain;

import com.comp322team12.together.domain.contains.Contains;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DIARY_ID")
    private Long id;

    @Column(name = "CONTENT", nullable = false)
    private String content;

    @Column(name = "EMOTION", nullable = false)
    private String emotion;

    @Column(name = "CREATED_DATE", nullable = false)
    private Date createdDate;

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    private List<Contains> contains = new ArrayList<>();

    @Builder
    public Diary(Long id, String content, String emotion, Date createdDate) {
        this.id = id;
        this.content = content;
        this.emotion = emotion;
        this.createdDate = createdDate;
    }
}
