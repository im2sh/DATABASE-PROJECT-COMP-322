--phase 2-1 USERS_ID 조건 추가
SELECT U.USER_NAME, U.EMAIL
FROM USERS U
WHERE U.USERS_ID = 1;

--phase 2-17 CITY 조건 추가
SELECT U.User_Name, P.City, E.Event_Name, COUNT(R.Reservation_ID) AS Total_Reservations
FROM USERS U
JOIN RESERVATION R ON U.Users_ID = R.Users_ID
JOIN PLACE P ON R.Place_ID = P.Place_ID
JOIN EVENT E ON E.Place_ID = P.Place_ID
WHERE P.City Like '부산%'  -- 특정 도시를 지정
GROUP BY U.User_Name, P.City, E.Event_Name
ORDER BY Total_Reservations DESC, U.User_Name, E.Event_Name;  