## 스프링부트 실행 방법

### 인텔리제이 개발환경 (버전정보)

IntelliJ IDEA 2023.2.5 (Ultimate Edition)

Build #IU-232.10227.8, built on November 9, 2023

Runtime version: 17.0.9+7-b1000.46 aarch64

VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o.

### 01-SDK 설정

File > Project > Project Structure에서

1. Projects > SDK > 17 Oracle OpenJDK version 17.0.6
2. Modules > Module SDK > Project SDK 17

선택 후, OK

### 02-Gradle 설정

Settings > Gradle > Gradle JVM: 17 Oracle OpenJDK version 17.0.6

선택 후, OK

### 03-데이터베이스 연결

1. Team12_Phase2_DDL, Team12_Phase2_Insert 실행 완료된 DB 준비
2. main > resources 에서 application [settings.properties](http://settings.properties) 파일 생성 후, #encoding, #dbms, #jpa 정보 입력
3. src > java > api > service > TogetherApplication 접속 및 실행
