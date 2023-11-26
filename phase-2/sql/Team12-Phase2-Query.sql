-- Type 1 : A single-table query

-- 모든 사용자의 이름과 이메일 주소 가져오기
SELECT U.USER_NAME, U.EMAIL
FROM USERS U;

-- 대구에 있는 모든 식당 가져오기
SELECT *
FROM PLACE P
WHERE P.CITY LIKE '%대구%' AND P.CATEGORY = 'DINING';


-- TYPE 2 : Multi-way join with join predicates in WHERE

--  모든 Pet과 펫에 맞는 주인 가져오기
SELECT U.USER_NAME, P.PET_NAME, P.SPECIES, P.GENDER, P.AGE, P.INTRODUCTION
FROM PET P, USERS U
WHERE U.USERS_ID = P.USERS_ID;

-- 대구에서 열리는 모든 이벤트의 이름, 가게 이름, 시작일, 종료일, 설몀 가져오기
SELECT E.EVENT_NAME, P.PLACE_NAME, E.START_DATE, E.END_DATE, E.DESCRIPTION
FROM PLACE P, EVENT E
WHERE P.PLACE_ID = E.PLACE_ID AND P.CITY LIKE '%대구%';



-- TYPE 3 : Aggregation + multi-way join with join predicates + with GROUP BY

-- 지역별로 평점이 4점 넘는 가게 갯수 세기
SELECT P.CITY, COUNT(*) AS TOTAL_CATEGORY
FROM PLACE P
JOIN REVIEW R ON P.PLACE_ID = R.PLACE_ID
WHERE R.RATING >= 4
GROUP BY P.CITY;


-- 웰시 코기를 키우는 사람들이 작성한 일기 갯수
SELECT U.USER_NAME, COUNT(d.diary_id) AS DIARY_COUNT
FROM USERS U
JOIN PET P ON U.USERS_ID = P.USERS_ID
JOIN DIARY D ON U.USERS_ID = D.USERS_ID
WHERE P.SPECIES = '웰시 코기'
GROUP BY U.USER_NAME
ORDER BY DIARY_COUNT DESC;
 
-- TYPE 4 : Subqury

-- 평점이 5점인 가게 이름, 카테고리, 위치 가져오기
SELECT P.PLACE_NAME, P.CATEGORY, P.CITY, P.DETAIL_ADDRESS
FROM PLACE P
WHERE PLACE_ID IN (
    SELECT R.PLACE_ID
    FROM REVIEW R
    WHERE RATING = 5
)
ORDER BY P.CATEGORY ASC;

-- 일기가 가장 많이 작성된 장소 가져오기 
SELECT P.PLACE_NAME, P.CATEGORY, P.CITY, P.DETAIL_ADDRESS
FROM PLACE P
WHERE P.PLACE_ID = (
    SELECT PLACE_ID
    FROM (
        SELECT P.PLACE_ID, COUNT(D.DIARY_ID) AS DIARY_COUNT
        FROM PLACE P
        JOIN Contains C ON P.PLACE_ID = C.PID
        JOIN DIARY D ON C.DID = D.DIARY_ID
        GROUP BY P.PLACE_ID
        ORDER BY COUNT(D.DIARY_ID) DESC
    )
    WHERE ROWNUM = 1
);



-- TYPE 5 : EXISTS를 포함하는 Subquery

-- 리뷰를 하나라도 작성한 User의 이름과 이메일 가져오기
SELECT U.USER_NAME, U.EMAIL
FROM USERS U
WHERE EXISTS (
    SELECT 1
    FROM REVIEW R
    WHERE R.USERS_ID = U.USERS_ID
);

-- 이벤트가 열리는 가게 이름, 도시 가져오기
SELECT P.PLACE_NAME, P.CITY, P.DETAIL_ADDRESS
FROM PLACE P
WHERE EXISTS (
    SELECT 1
    FROM EVENT E
    WHERE E.PLACE_ID = P.PLACE_ID
);


-- Type 6: Selection + Projection + IN predicates

-- 카테고리가 CAFE와 DINING 장소 오름차순으로 가져오기
SELECT *
FROM PLACE P
WHERE P.CATEGORY IN ('CAFE','DINING')
ORDER BY P.CATEGORY;

-- '웰시 코기'나 '세인트 버나드'로 등록된 애완동물의 이름과 종류를 가져오기
SELECT P.Pet_Name, P.Species
FROM PET P
WHERE P.Species IN ('웰시 코기', '세인트 버나드');


-- Type 7: In-line view를 활용한 Query

-- 이름에 '이' 가 들어가는 사용자가 작성한 일기 나타내기
SELECT *
FROM DIARY D
WHERE D.USERS_ID IN (SELECT U.USERS_ID
                     FROM USERS U
                     WHERE U.USER_NAME LIKE '%이%');
                        
-- 강아지를 키우는 사용자 나타내기
SELECT U.USER_NAME, U.PHONE_NUMBER
FROM USERS U
WHERE U.USERS_ID IN (SELECT P.USERS_ID
                     FROM PET P);
                        
-- Type 8: Multi-way join with join predicates in WHERE + ORDER BY

-- 2023년 이전에 작성된 리뷰와 장소와 사람 이름을 과거순으로 가져오기
SELECT R.CONTENT, P.PLACE_NAME, U.USER_NAME, TO_CHAR(R.CREATED_DATE, 'YYYY-MM-DD') AS CREATED_DATE
FROM REVIEW R
INNER JOIN PLACE P ON R.PLACE_ID = P.PLACE_ID
INNER JOIN USERS U ON R.USERS_ID = U.USERS_ID
WHERE EXTRACT(YEAR FROM R.CREATED_DATE) < 2023 
ORDER BY R.CREATED_DATE;

-- 카테고리가 CAFE인 PLACE인 곳을 즐겨찾기가 높은 순으로 가져오기
SELECT P.PLACE_NAME, COUNT(*) AS RANKING
FROM PLACE P
JOIN BOOKMARK B ON P.PLACE_ID = B.PLACE_ID
WHERE P.CATEGORY = 'CAFE'
GROUP BY P.PLACE_NAME
ORDER BY RANKING DESC;


-- TYPE 9 : Aggregation + multi-way join with join predicates + with GROUP BY + ORDER BY

-- 가장 많은 일기가 작성된 장소를 계산하고, 가게 이름과 위치 나타내기
SELECT P.PLACE_NAME, P.DETAIL_ADDRESS, DIARY_COUNTS.DIARY_COUNT
FROM PLACE P
JOIN (
    SELECT PID, DIARY_COUNT
    FROM (
        SELECT PID, COUNT(DID) AS DIARY_COUNT
        FROM CONTAINS
        GROUP BY PID
    ) C
    WHERE C.DIARY_COUNT = (
        SELECT MAX(DIARY_COUNT)
        FROM (
            SELECT PID, COUNT(DID) AS DIARY_COUNT
            FROM CONTAINS
            GROUP BY PID
        ) MAX_COUNTS
    )
) DIARY_COUNTS
ON P.PLACE_ID = DIARY_COUNTS.PID
ORDER BY P.PLACE_NAME ASC;

-- 사용자가 예약한 장소와 이벤트를 기준으로, 각 도시에서의 예약 횟수를 가져오기
-- 예약 횟수가 많은 순서로 정렬되며, 예약 횟수가 동일한 경우 사용자 이름과 이벤트 이름 순으로 정렬됨
SELECT U.User_Name, P.City, E.Event_Name, COUNT(R.Reservation_ID) AS Total_Reservations
FROM USERS U
JOIN RESERVATION R ON U.Users_ID = R.Users_ID
JOIN PLACE P ON R.Place_ID = P.Place_ID
JOIN EVENT E ON E.Place_ID = P.Place_ID
GROUP BY U.User_Name, P.City, E.Event_Name
ORDER BY Total_Reservations DESC, U.User_Name, E.Event_Name;

-- TYPE 10: SET operation (UNION, SET DIFFERENCE, INTERSECT 등중 하나)를 활용한 query
-- '@example.com' 도메인의 이메일을 가진 사용자들과 북마크로 장소를 등록한 사용자들의 ID와 이메일 나타내기
SELECT Users_ID, Email FROM USERS WHERE Email LIKE '%@example.com'
UNION
SELECT U.Users_ID, U.Email FROM USERS U, BOOKMARK B WHERE U.Users_ID = B.Users_ID;

-- 특정 가게 카테고리를 제외한 리뷰 목록 가져오기 (SET DIFFERENCE - MINUS)
SELECT Review_ID, Rating, Content, Created_Date
FROM Review
MINUS
SELECT R.Review_ID, R.Rating, R.Content, R.Created_Date
FROM Review R
JOIN Bookmark B ON R.Place_ID = B.Place_ID
JOIN Place P ON B.Place_ID = P.Place_ID
WHERE P.Category = 'bar';
