# DATABASE-PROJECT-COMP-322

# 🐶 투개더 프론트엔드

## 시작하기

### 사전 요구 사항

#### 프론트엔드

```bash
npm install npm@latest -g
```

### 설치하기

개발 환경을 실행하는 방법에 대한 단계별 예시입니다.

먼저, 저장소를 클론합니다.

```bash
git clone https://github.com/im2sh/DATABASE-PROJECT-COMP-322.git
```

그 다음, 디렉토리를 'phase-4/togaether/src/main/frontend'로 변경합니다.

의존성 설치를 진행합니다.

```bash
npm install
```

애플리케이션을 실행하려면 아래 명령어를 입력하세요.

```bash
npm run start
```

이렇게 하면 앱이 개발 모드로 실행됩니다.
브라우저에서 [http://localhost:3000](http://localhost:3000/)을 열어서 접속할 수 있습니다.

## 사용된 라이브러리

이 프로젝트에 사용된 라이브러리/프레임워크와 버전들입니다.

- [@chakra-ui/react](https://chakra-ui.com/) v2.8.2
- [@emotion/react](https://emotion.sh/docs/@emotion/react) v11.11.1
- [@emotion/styled](https://emotion.sh/docs/@emotion/styled) v11.11.0
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) v5.17.0
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro) v13.4.0
- [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event/) v13.5.0
- [axios](https://axios-http.com/) v1.6.2
- [framer-motion](https://www.framer.com/api/motion/) v10.16.5
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) v2.0.6
- [react](https://reactjs.org/) v18.2.0
- [react-dom](https://reactjs.org/docs/react-dom.html) v18.2.0
- [react-icons](https://react-icons.github.io/react-icons/) v4.12.0
- [react-router-dom](https://reactrouter.com/) v6.20.0
- [react-scripts](https://github.com/facebook/create-react-app) v5.0.1
- [styled-components](https://styled-components.com/) v6.1.1
- [web-vitals](https://web.dev/vitals/) v2.1.4
- [zustand](https://github.com/pmndrs/zustand) v.4.4.7


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
   - 새로운 데이터 삽입을 위해 1씩 증가하는 무결성 제약 조건을 가지는 Sequence 생성
      - Diary_ID, Pet_ID, User_ID
   
</br></br>
### DML 변경
1. Team12_Phase4_Insert.sql 파일 수정
   - DDL의 변경으로 인해, Insert 또한 파일 수정이 발생 
   - 자바에 있는 LocalDateTime 객체를 이용하여 생성 날짜를 생성하고 저장하는 과정에서 Oracle DB와 호환이 되지 않아, Data Field에 TO_DATE 추가
     - e.g. TO_DATE('2021-10-01', 'YYYY-MM-DD')
   - Contains 삭제에 따라 Diary FK 설정 변경
   - Pet PK 부여에 따라 PET ID 설정 변경
  
