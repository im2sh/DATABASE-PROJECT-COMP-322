1. Java 컴파일러(javac)와 Java 실행 환경(java)의 버전 정보
	javac 1.8.0_391
	java version "1.8.0_391"
	Java(TM) SE Runtime Environment (build 1.8.0_391-b13)
	Java HotSpot(TM) 64-Bit Server VM (build 25.391-b13, mixed mode)

2. 실행 방법: 프로젝트 루트 폴더에서 다음 명령어를 사용하여 컴파일 및 실행
  1. Oracle에 로그인합니다.

  2. phase-2 디렉토리로 이동합니다.
	-	Team12-Phase2-DDL.sql을 실행합니다.
  - Team12-Phase2-Insert.sql을 실행합니다.
	
  3.IntelliJ로 Phase3을 엽니다.
  - Main.java로 이동 후, DB 커넥션을 위해 사용자가 설정한 환경에 맞게 URL, USER_ID, USER_PASSWD를 수정합니다.
  - Main.java를 실행합니다.

* Eclipse에서 Import 시,
		3-1) Import > select > projects from Folder or Archive
		3-2) Next > import source : directory 선택 후, phase-3 폴더 선택 > Finish
		3-3) Phase-3 프로젝트 마우스 우클릭 > Properties > java Build Path > Libraries > class path > add external JARS > Team12폴더 내 oracle_jdbc_drivers에서 맞는 버전의 jar 선택 > Apply and Close

3. 기능 설명
	프로그램이 실행되면 메뉴가 표시되며 사용자는 1에서 16까지의 숫자 중 하나를 선택하여 서비스를 이용
	사용자는 다양한 쿼리를 선택하여 각 쿼리가 필요로 하는 Parameter 입력 후, 원하는 정보를 조회/생성/수정/삭제 할 수 있음
	각 쿼리는 사용자의 입력에 따라 데이터베이스와 상호작용하여 원하는 정보를 가져옴
  1. 로그인
     사용자 Email, Password를 한 줄씩 입력받아 로그인합니다. 
  2. 회원가입
     사용자 이름, 휴대폰 번호, 이메일, 비밀 번호를 순서대로 입력받아 회원가입합니다.
  3. 비밀번호 변경
     사용자 이메일, 변경 전 비밀번호, 변경하려는 비밀번호를 순서대로 입력받아 회원가입합니다.
     이전 비밀번호와 일치하지 않을시 변경이 거절됩니다.

4. 유의사항
	프로그램 실행 전에 데이터베이스에 연결되어 있어야 함
	데이터베이스 연결 정보는 Connection 객체를 통해 설정되어야 함
	
5. 쿼리 수정사항
	phase 2에서 제출한 쿼리 중 13개 쿼리 사용: 11개 쿼리 그대로 사용, 2개 쿼리는 수정하여 사용(where 조건 추가)
	수정하여 사용한 쿼리는 sql파일 함께 첨부하였음