#Entity

1. User (회원)
- 회원 Entity는 '투개더'의 이용자를 의미한다.
- Attribute:
    - User_ID : 회원 ID (Primary Key)
    - UserName : 회원 이름
    - Password : 회원 비밀번호
    - Email : 회원 이메일
    - PhoneNumber: 회원 전화번호

2. Pet (반려동물) [Weak Entity]
- 반려동물 Entity는 이용자의 반려동물을 의미한다.
- Attribute:
    - PetName : 반려동물 이름 (Partial key)
    - Age : 반려동물 나이
    - Species : 반려동물 종류
    - Gender : 반려동물 성별
    - Introduction : 반려동물 소개

3. Place (장소)
- 장소 Entity는 애완동물 동반이 가능한 장소를 의미한다.
- Attribute:
    - Place_ID : 장소 ID (Primary Key)
    - PlaceName : 가게 상호명
    - Image_Url : 가게 사진
    - Business_Hour : 가게 영업 시간
    - Category : 가게 분류
    - Address (Composite)
        - City : 가게가 위치한 도시(구)
        - Detail_address : 가게의 도로명 주소
	     - 본 프로젝트의 범위는 대구 지역 내로 한정함
    - Coordinate (Composite)
        - Latitude : 가게의 위도
        - Longitude : 가게의 경도

*Image_Url을 사용하는 이유
    - 이미지URL을 사용하면 이미지 파일을 서버에 업로드하고 관리하는 추가적인 작업이 필요하지 않음
    - 이미지를 웹에서 호스팅하거나 이미지 저장 및 관리 시스템을 통해 더 쉽게 관리할 수 있음
    - 데이터베이스에 이미지를 저장하지 않기 때문에 데이터베이스 크기가 줄어들고 데이터베이스 백업 및 관리가 더 쉬워짐

4. Review (리뷰)
- 리뷰 Entity는 사용자가 방문한 장소에 대한 리뷰를 의미한다.
- Attribute:
    - Review_ID : 리뷰 ID (Primary Key)
    - Rating : 리뷰 별점
    - Content : 리뷰 내용
    - CreatedDate : 작성 일자

5. Diary (일기)
- 일기 Entity는 사용자가 반려동물과 방문한 장소에 대한 경험을 바탕으로 기록한 일기를 의미한다.
- Attribute:
    - Diary_ID : 일기 ID (Primary Key)
    - Content : 일기 내용
    - Emotion : 오늘의 감정
    - CreatedDate : 작성 일자

6. Coupon (쿠폰)
- 쿠폰 Entity는 사용자가 특정 카테고리에 적용되는 장소에서 사용 가능한 쿠폰을 의미한다.
- Attribute:
    - Coupon_ID : 쿠폰 ID (Primary Key)
    - Discount_Account : 할인율
    - ExpirationDate : 만료 일자
    - CouponName : 쿠폰 명
    - Maximum : 최대 할인 금액
    - Category : 할인 적용 가능한 카테고리

7. Bookmark (즐겨찾기) [Weak Entity]
- 즐겨찾기 Entity는 사용자가 즐겨찾기로 등록한 가게를 쉽게 방문하기 위함과 즐겨찾기로 등록한 사용자에게 이벤트 발생시 알림을 주도록 하기 위한 개체를 의미한다.
- Attribute:
    - Status : 즐겨찾기 여부 (T/F)

8. Event (이벤트)
- 이벤트 Entity는 가게에서 할인, 행사 등이 발생하는 경우를 의미한다.
- Attribute:
    - Event_ID : 이벤트 ID (Primary Key)
    - EventName : 이벤트 제목
    - Period : 이벤트 기간
    - Description : 이벤트 설명

9. Reservation (예약)
- 예약 Entity는 사용자가 장소에 대한 예약을 하기 위함을 의미한다. (EX: NOOOO 예약 System)
- Attribute:
    - Reservation_ID : 예약 ID (Primary Key)
    - Date : 예약일자
    - Price : 결제 예정 금액

---

#Relation

1. [OWNS]
- ROLL NAME:
    - User -> PetOwner
    - Pet -> OwnedPet
- Cardinality Ratio:
    - 1 (User) : N (Pet)
    - USER는 여러 마리의 PET을 키울 수 있고, 각 PET은 한 명의 USER과 관계를 가진다.
    - 모든 USER가 PET을 가지고 있을 필요는 없으므로 부분 참여
    - 모든 PET은 USER를 가지고 있어야 하기 때문에 전체 참여

2. [GETS]
- ROLL NAME:
    - User -> Receiver
    - Coupon -> Coupon
- Cardinality Ratio:
    - 1 (User) : N (Coupon)
    - User는 여러 개의 Coupon을 가질 수 있고, 각 Coupon은 한 명의 User와 관계를 가진다.
    - 모든 User가 Coupon을 가지고 있을 필요는 없으므로 부분 참여
    - 모든 Coupon이 User를 가지고 있을 필요는 없으므로 부분 참여

3. [MARKS]
- ROLL NAME:
    - User -> Bookmarker
    - Bookmark -> Bookmark
- Cardinality Ratio:
    - 1 (User) : N (Bookmark)
    - USER는 여러 곳을 BOOKMARK로 등록할 수 있고, 각 BOOKMARK는 한 명의 USER와 관계를 가진다.
    - 모든 USER가 BOOKMARK를 가지고 있을 필요는 없으므로 부분 참여
    - 모든 BOOKMARK는 USER를 가지고 있어야 하기 때문에 전체 참여

4. [WRITES]
- ROLL NAME:
    - User -> DiaryWriter
    - Diary -> Diary
- Cardinality Ratio:
    - 1 (User) : N (Diary)
    - USER는 여러 개의 Diary를 작성할 수 있고, 각 Diary는 한 명의 User와 관계를 가진다.
    - 모든 User가 Diary를 작성할 필요는 없으므로 부분 참여
    - 모든 Diary는 User에 의해 작성되기 때문에 전체 참여

5. [RECORDS]
- ROLL NAME:
    - User -> Reviewer
    - Review -> Review
- Cardinality Ratio:
    - 1 (User) : N (Review)
    - USER는 여러 개의 Review를 작성할 수 있고, 각 Review는 한 명의 User와 관계를 가진다.
    - 모든 User가 Review를 작성할 필요는 없으므로 부분 참여
    - 모든 Review는 User에 의해 작성되기 때문에 전체 참여

6. [HASBOOKMARKS]
- ROLL NAME:
    - Place -> BookmarkTargetPlace
    - Bookmark -> Bookmark
- Cardinality Ratio:
    - 1 (Place) : N (Bookmark)
    - Place는 여러 개의 Bookmark를 가질 수 있고, 각 Bookmark는 한 개의 Bookmark와 관계를 가진다.
    - 모든 Place가 Bookmark를 가질 필요는 없으므로 부분 참여
    - 모든 Bookmark는 Place에 의해 표시되기 때문에 전체 참여

7. [CONTAINS]
- ROLL NAME:
    - Place -> DiaryTargetPlace
    - Diary -> LocatedDiary
- Cardinality Ratio:
    - N (Place) : M (Diary)
    - 하나의 Place는 여러 개의 Diary를 가질 수 있고, 하나의 Diary는 여러 개의 Place와 관계를 가진다.
    - Place는 Diary에 작성되지 않는 Place가 될 수 있으므로 부분 참여
    - Diary는 Place를 바탕으로 작성되기 때문에 전체 참여 

8. [REVIEWS_FOR]
- ROLL NAME:
    - Place -> ReviewedPlace
    - Review -> Review
- Cardinality Ratio:
    - 1 (Place) : N (Review)
    - 하나의 Place는 여러 개의 Review를 가질 수 있고, 각 Review는 한 개의 Place와 관계를 가진다.
    - 모든 Place가 Review를 가질 필요는 없으므로 부분 참여
    - 모든 Review는 Place에 의해 표시되기 때문에 전체 참여

9. [RESERVED]
- ROLL NAME:
    - Place -> ReservedPlace
    - Reservation -> Reservation
- Cardinality Ratio:
    - 1 (Place) : N (Reservation)
    - 하나의 Place는 여러 개의 Reservation를 가질 수 있고, 각 Reservation는 한 개의 Place와 관계를 가진다.
    - 모든 Place가 Reservation을 가질 필요는 없으므로 부분 참여
    - 모든 Reservation은 Place를 가져야 하기 때문에 전체 참여

10. [HAPPEN]
- ROLL NAME:
    - Place -> HappenedPlace
    - Event -> Event
- Cardinality Ratio:
    - 1 (Place) : N (Event)
    - 하나의 Place는 여러 개의 Event를 가질 수 있고, 각 Event는 한 개의 Place와 관계를 가진다.
    - 모든 Place가 Event 가질 필요는 없으므로 부분 참여
    - 모든 Event은 Place를 가져야 하기 때문에 전체 참여

11. [RESERVES]
- ROLL NAME:
    - User -> Subscriber
    - Reservation -> Reservation
- Cardinality Ratio:
    - 1 (User) : N (Reservation)
    - 하나의 User는 여러 개의 Reservation을 가질 수 있고, 각 Reservation은 한 개의 User와 관계를 가진다.
    - 모든 User가 Reservation을 가질 필요는 없으므로 부분 참여
    - 모든 Reservation은 User를 가져야 하기 때문에 전체 참여

---