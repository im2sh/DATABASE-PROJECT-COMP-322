//Togaether.class

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class Togaether {
    static Scanner sc= new Scanner(System.in);
    static ResultSet rs;

    public static void startService(Connection conn, Statement stmt) {
        System.out.println("Welcome to Togaether Service !");

        System.out.println("---------- 투개더: 반려동물 동반장소 검색 및 추억보관 서비스 ----------");

        while (true) {
            System.out.println("<Place>");
            System.out.println("0. 로그인");
            System.out.println("1. 특정 지역에 있는 모든 식당 가져오기");
            System.out.println("2. 지역별로 특정 평점 이상인 가게의 개수 세기");
            System.out.println("3. 특정 평점 이상인 가게의 이름, 카테고리, 위치 가져오기");
            System.out.println("4. 특정 카테고리의 장소들을 카테고리 기준 오름차순으로 가져오기");
            System.out.println("5. 특정 카테고리의 장소들 중 즐겨찾기가 높은 순으로 가져오기");
            System.out.println("6. 특정 카테고리를 제외한 리뷰 목록 가져오기\n");

            System.out.println("<Owner>");
            System.out.println("7. 이름에 특정 글자가 들어가는 사용자가 작성한 일기 가져오기");
            System.out.println("8. 특정 도메인의 이메일을 가진 사용자들과 북마크로 장소를 등록한 사용자들의 ID와 이메일 나타내기");
            System.out.println("9. 특정 동물을 키우는 사용자 나타내기");
            System.out.println("10. 특정 지역에서 열리는 이벤트 정보 나타내기");
            System.out.println("11. 특정연도 이전에 작성된 리뷰/장소/사람 이름을 과거순으로 가져오기");
            System.out.println("12. 특정 사용자 이름과 이메일 주소 가져오기");
            System.out.println("13. 특정 도시별 사용자가 예약한 장소 및 이벤트, 예약횟수 정보 가져오기");

            System.out.println("----------------------------------------------------");

            System.out.print("숫자 입력 (1~13 / 그 외의 문자 입력 시 종료): ");
            switch (sc.nextInt()) {
                case 1:
                    query1(conn, stmt);
                    break;
                case 2:
                    query2(conn, stmt);
                    break;
                case 3:
                    query3(conn, stmt);
                    break;
                case 4:
                    query4(conn, stmt);
                    break;
                case 5:
                    query5(conn, stmt);
                    break;
                case 6:
                    query6(conn, stmt);
                    break;
                case 7:
                    query7(conn, stmt);
                    break;
                case 8:
                    query8(conn, stmt);
                    break;
                case 9:
                    query9(conn, stmt);
                    break;
                case 10:
                    query10(conn, stmt);
                    break;
                case 11:
                    query11(conn, stmt);
                    break;
                case 12:
                    query12(conn, stmt);
                    break;
                case 13:
                    query13(conn, stmt);
                    break;
                default:
                    System.out.println("service is terminated");
                    System.exit(0);
                    break;
            }
        }
    }

    private static void query1(Connection conn, Statement stmt) {
        System.out.print("원하는 지역 입력 (예: 대구광역시): ");
        bufferClear();
        String location =sc.nextLine();

        String query = "SELECT * FROM PLACE P " +
                "WHERE P.CITY LIKE '%" + location + "%' " +
                "AND P.CATEGORY = 'DINING'";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            while (rs.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }
        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void query2(Connection conn, Statement stmt) {
        System.out.print("최소 평점 (예: 4): ");
        int minRating = sc.nextInt();

        String query = "SELECT P.CITY, COUNT(*) AS TOTAL_CATEGORY " +
                "FROM PLACE P " +
                "JOIN REVIEW R ON P.PLACE_ID = R.PLACE_ID " +
                "WHERE R.RATING >= " + minRating +
                "GROUP BY P.CITY";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResults = false;
            while (rs.next()) {
                hasResults = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResults) {
                System.out.println(minRating + "점을 넘는 가게가 존재하지 않음");
            }
        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void query3(Connection conn, Statement stmt) {
        System.out.print("평점 (예: 5): ");
        int rating =sc.nextInt();

        String query = "SELECT P.PLACE_NAME, P.CATEGORY, P.CITY, P.DETAIL_ADDRESS " +
                "FROM PLACE P " +
                "WHERE PLACE_ID IN (" +
                "    SELECT R.PLACE_ID " +
                "    FROM REVIEW R " +
                "    WHERE RATING >= " + rating +
                ") " +
                "ORDER BY P.CATEGORY ASC";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResults = false;
            while (rs.next()) {
                hasResults = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResults) {
                System.out.println(rating + "점 평점을 받은 가게가 존재하지 않음");
            }

        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void query4(Connection conn, Statement stmt) {
        System.out.print("조회할 장소의 카테고리 (예: CAFE, DINING, ...): ");
        bufferClear();
        String category =sc.nextLine();
        String query = "SELECT * FROM PLACE P WHERE P.CATEGORY = '" + category + "' ORDER BY P.CATEGORY ASC";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResults = false;
            while (rs.next()) {
                hasResults = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResults) {
                System.out.println("카테고리 '" + category + "'에 해당하는 장소가 존재하지 않음");
            }

        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void query5(Connection conn, Statement stmt) {
        System.out.print("조회할 카테고리 (예: CAFE, DINING, ...): ");
        bufferClear();
        String category =sc.nextLine();

        String query = "SELECT P.PLACE_NAME, COUNT(*) AS RANKING " +
                "FROM PLACE P " +
                "JOIN BOOKMARK B ON P.PLACE_ID = B.PLACE_ID " +
                "WHERE P.CATEGORY = '" + category + "' " +
                "GROUP BY P.PLACE_NAME " +
                "ORDER BY RANKING DESC";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResults = false;
            while (rs.next()) {
                hasResults = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResults) {
                System.out.println("카테고리 '" + category + "'에 해당하는 즐겨찾기 순위가 높은 장소가 존재하지 않음");
            }

        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void query6(Connection conn, Statement stmt) {
        System.out.print("제외할 카테고리 (예: BAR, ...): ");
        bufferClear();
        String excludedCategory =sc.nextLine();

        String query = "SELECT Review_ID, Rating, Content, Created_Date " +
                "FROM Review " +
                "WHERE Place_ID NOT IN ( " +
                "    SELECT B.Place_ID " +
                "    FROM Bookmark B " +
                "    JOIN Place P ON B.Place_ID = P.Place_ID " +
                "    WHERE P.Category = '" + excludedCategory + "'" +
                ")";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResults = false;
            while (rs.next()) {
                hasResults = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResults) {
                System.out.println("카테고리 '" + excludedCategory + "'를 제외한 리뷰가 존재하지 않음");
            }

        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void query7(Connection conn, Statement stmt) {
        System.out.print("이름에 포함할 글자 (예: 김, 이, 박, 최, ...): ");
        bufferClear();
        String includedChar =sc.nextLine();

        String query = "SELECT * FROM DIARY D " +
                "WHERE D.USERS_ID IN (SELECT U.USERS_ID " +
                "FROM USERS U " +
                "WHERE U.USER_NAME LIKE '%" + includedChar + "%')";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResults = false;
            while (rs.next()) {
                hasResults = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResults) {
                System.out.println("'" + includedChar + "' 글자를 포함한 이름을 가진 사용자의 일기가 존재하지 않음");
            }

        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void query8(Connection conn, Statement stmt) {
        System.out.print("도메인 (예: @example.com): ");
        bufferClear();
        String domain =sc.nextLine();

        String query = "SELECT Users_ID, Email FROM USERS WHERE Email LIKE '%" + domain + "'" +
                " UNION " +
                "SELECT U.Users_ID, U.Email FROM USERS U, BOOKMARK B WHERE U.Users_ID = B.Users_ID";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResults = false;
            while (rs.next()) {
                hasResults = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResults) {
                System.out.println("'" + domain + "' 도메인을 가진 사용자와 북마크로 장소를 등록한 사용자가 존재하지 않음");
            }

        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void query9(Connection conn, Statement stmt) {
        System.out.print("동물 종류 (예: 강아지): ");
        bufferClear();
        String petType =sc.nextLine();

        String query = "SELECT U.USER_NAME, U.PHONE_NUMBER " +
                "FROM USERS U " +
                "WHERE U.USERS_ID IN (SELECT P.USERS_ID FROM PET P WHERE P.SPECIES = '" + petType + "')";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResults = false;
            while (rs.next()) {
                hasResults = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResults) {
                System.out.println("'" + petType + "'를 키우는 사용자가 존재하지 않음");
            }

        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void query10(Connection conn, Statement stmt){
        Scanner sc = new Scanner(System.in);
        System.out.print("열리는 이벤트가 뭔지 궁금한 지역 (예: 대구광역시): ");
        String location = sc.nextLine();

        String query = "SELECT E.EVENT_NAME, P.PLACE_NAME, E.START_DATE, E.END_DATE, E.DESCRIPTION " +
                "FROM PLACE P, EVENT E " +
                "WHERE P.PLACE_ID = E.PLACE_ID AND P.CITY LIKE '%" + location + "%'";

        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResult = false;

            while (rs.next()) {
                hasResult = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResult) {
                System.out.println(location + " 지역에서 열리는 이벤트가 존재하지 않음");
            }
        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void query11(Connection conn, Statement stmt) {
        System.out.print("연도 입력 (예: 2023): ");
        int year = sc.nextInt();

        String query = "SELECT R.CONTENT, P.PLACE_NAME, U.USER_NAME, TO_CHAR(R.CREATED_DATE, 'YYYY-MM-DD') AS CREATED_DATE " +
                "FROM REVIEW R INNER JOIN PLACE P ON R.PLACE_ID = P.PLACE_ID " +
                "INNER JOIN USERS U ON R.USERS_ID = U.USERS_ID " +
                "WHERE EXTRACT(YEAR FROM R.CREATED_DATE) < " + year +
                "ORDER BY R.CREATED_DATE";

        executeAndPrintQuery(query, stmt);
    }

    private static void query12(Connection conn, Statement stmt) {
        System.out.print("사용자 아이디 입력 (1~500): ");
        int userId = sc.nextInt();

        String query = "SELECT U.USER_NAME, U.EMAIL FROM USERS U " +
                "WHERE U.USERS_ID = " + userId;

        executeAndPrintQuery(query, stmt);
    }

    private static void query13(Connection conn, Statement stmt) {
        System.out.print("원하는 지역 입력 (예: 부산): ");
        bufferClear();
        String location =sc.nextLine();


        String query = "SELECT U.User_Name, P.City, E.Event_Name, COUNT(R.Reservation_ID) AS Total_Reservations " +
                "FROM USERS U " +
                "JOIN RESERVATION R ON U.Users_ID = R.Users_ID " +
                "JOIN PLACE P ON R.Place_ID = P.Place_ID " +
                "JOIN EVENT E ON E.Place_ID = P.Place_ID " +
                "WHERE P.City LIKE '" + location + "%' " +
                "GROUP BY U.User_Name, P.City, E.Event_Name " +
                "ORDER BY Total_Reservations DESC, U.User_Name, E.Event_Name";

        executeAndPrintQuery(query, stmt);
    }

    //쿼리 실행문 반복되는 거 많은거 같아서 합쳤는데 각 함수별로 에러 문구 다르게 하는 것도 고민중
    private static void executeAndPrintQuery(String query, Statement stmt) {
        try {
            ResultSet rs = stmt.executeQuery(query);

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            boolean hasResults = false;
            while (rs.next()) {
                hasResults = true;
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

            if (!hasResults) {
                System.out.println("결과가 존재하지 않습니다.");
            }
        } catch (SQLException e) {
            System.err.println("SQL error = " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void bufferClear() {
        sc.nextLine();
    }
}