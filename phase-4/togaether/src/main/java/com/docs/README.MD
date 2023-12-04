# 🐶 투개더 백엔드 

## 개발 환경

**[OS]**</br>
MAC
Sonoma 14.0

**[Language]**</br>
Java
17.0.6

**[Framework]**</br>
Spring Boot : 3.1.5</br>
Spring-Data-JPA</br>
Spring-Web</br>
Swagger : 3.0.0</br>
Lombok : 1.18.28</br>
Ojdbc : 11 version : 23.2.0.0</br>

**[IDE]**</br>
IntelliJ IDEA 2023.2.5 (Ultimate Edition)</br>
Build #IU-232.10227.8, built on November 9, 2023</br>
Runtime version: 17.0.9+7-b1000.46 aarch64</br>
VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o.

### DBMS
Oracle 버전: Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production</br>
SQLPLUS 버전: PL/SQL Release 21.0.0.0.0 - Production</br>
Oracle SQL Developer 버젼: 22.2.0.173</br>
Oracle SQL Developer 빌드: 173.2018</br>

### SQL
DDL : phase-4/togaether/src/main/resources/sql/Team12_Phase4_DDL.sql</br>
DML : phase-4/togaether/src/main/resources/sql/Team12_Phase4_Insert.sql</br>

## 실행 방법
### 01-SDK 설정

File > Project > Project Structure에서

1. Projects > SDK > 17 Oracle OpenJDK version 17.0.6
2. Modules > Module SDK > Project SDK 17

선택 후, OK

### 02-Gradle 설정

Settings > Gradle > Gradle JVM: 17 Oracle OpenJDK version 17.0.6

선택 후, OK

### 03-데이터베이스 연결

1. Team12_Phase4_DDL, Team12_Phase4_Insert 실행 완료된 DB 준비
2. main > resources 에서 application [settings.properties](http://settings.properties) 파일 생성 후, #encoding, #dbms, #jpa 정보 입력
3. src > java > api > service > TogetherApplication 접속 및 실행

## 수정
### DDL 변경
1. Team12_Phase4_DDL.sql 파일 수정
   - 기존에 Diary와 Place는  N:M 관계로 되어 있어서, 중간 테이블인 Contains가 존재
      - 투개더의 서비스는 하나의 일기에 하나의 장소에 종속적인 관계이기 때문에, Diary와 Place는 1:N 관계로 변경
      - 따라서, Contains 테이블 삭제
   </br></br>
   - Pet PK를 부여
      - 기능 확장을 고려하여 Sequence한 Key값을 가지고 있어야 한다고 판단
      - 기존에 User_ID와 petName의 조합하여 복합키로 가지고 있었으나, Pet_ID을 생성하여 PK를 부여
</br></br>
### DML 변경
1. Team12_Phase4_Insert.sql 파일 수정
   - DDL의 변경으로 인해, Insert 또한 파일 수정이 발생 
   - 자바에 있는 LocalDateTime 객체를 이용하여 생성 날짜를 생성하고 저장하는 과정에서 Oracle DB와 호환이 되지 않아, Data Field에 TO_DATE 추가
     - e.g. TO_DATE('2021-10-01', 'YYYY-MM-DD')
   - Contains 삭제에 따라 Diary FK 설정 변경
   - Pet PK 부여에 따라 PET ID 설정 변경
  