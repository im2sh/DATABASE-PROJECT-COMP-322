0. 확인 명령어/방법
	docker --version
	docker images
	docker start oracle
	docker exec -it oracle sqlplus
	SQL> SELECT * FROM V$VERSION;

	sqlplus 접속: 상단 도움말 - 정보 

1. 동작 환경
    다음 환경에서 본 SQL문을 작성/실행 했습니다.
    1) Docker 버전: Docker version 24.0.6, build ed223bc820
		2) Docker 이미지: gvenzl/oracle-xe
    2) Oracle 버전: Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production
    3) SQLPLUS 버전: PL/SQL Release 21.0.0.0.0 - Production
    4) Oracle SQL Developer 버젼: 22.2.0.173
    5) Oracle SQL Developer 빌드: 173.2018

2. 실행 방법
   다음 순서를 통해 실행 부탁드립니다.
    1) SQL Developer 접속
    2) Team12/Team12_Phase2_DDL.sql을 실행하여 제약 조건 및 트리거 선언
    3) Team12/Team12-Phase2_Insert.sql을 실행하여 테이블에 데이터 삽입
    5) Team12/Team12-Phase2_Query.sql을 실행하여 Query문 실행