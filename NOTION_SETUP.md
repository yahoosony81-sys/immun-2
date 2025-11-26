# 노션(Notion) 연결 가이드

## 📋 전체 과정 요약

1. 노션에서 데이터베이스 만들기
2. 노션 API 토큰 발급받기
3. 데이터베이스 ID 확인하기
4. 환경 변수 설정하기
5. 코드 수정하기

---

## 1단계: 노션 데이터베이스 만들기

### 1-1. 노션 페이지 생성
1. 노션(https://www.notion.so)에 로그인
2. 새 페이지 만들기 (왼쪽 상단 "+" 버튼)
3. 페이지 이름: "면역공방 예약 관리" (원하는 이름으로 변경 가능)

### 1-2. 데이터베이스 생성
1. 페이지 안에서 `/database` 입력
2. "Table - Inline" 선택
3. 데이터베이스가 생성됨

### 1-3. 데이터베이스 속성(컬럼) 설정
다음 속성들을 추가하세요:

| 속성 이름 | 속성 타입 | 설명 |
|---------|---------|------|
| 이름 | Title | 예약자 이름 (기본 제공됨) |
| 이메일 | Email | 예약자 이메일 |
| 전화번호 | Phone number | 예약자 전화번호 |
| 희망 날짜 | Date | 예약 희망 날짜 |
| 희망 시간 | Select | 예약 희망 시간 (예: 09:00) |
| 생성일시 | Created time | 자동으로 생성됨 |

**설정 방법:**
- 각 속성 이름 옆의 "+" 버튼 클릭
- 속성 이름 입력 후 타입 선택
- "Done" 클릭

---

## 2단계: 노션 API 토큰 발급받기

### 2-1. 노션 통합(Integration) 만들기
1. https://www.notion.so/my-integrations 접속
2. "+ New integration" 클릭
3. 설정 입력:
   - **Name**: "면역공방 예약 시스템" (원하는 이름)
   - **Associated workspace**: 본인의 워크스페이스 선택
   - **Type**: Internal (내부용)
   - **Capabilities**: 
     - ✅ Read content 체크
     - ✅ Update content 체크
     - ✅ Insert content 체크
4. "Submit" 클릭

### 2-2. 토큰 복사하기
1. 생성된 통합 페이지에서 "Internal Integration Token" 섹션 확인
2. "Show" 클릭하여 토큰 표시
3. 토큰을 복사해두세요 (나중에 사용)
   - 예: `secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 3단계: 데이터베이스 ID 확인하기

### 3-1. 데이터베이스 URL에서 ID 추출

**📌 중요: 데이터베이스 ID는 URL의 특정 위치에 있습니다**

1. 노션에서 만든 데이터베이스 페이지 열기
2. 브라우저 주소창의 URL 확인

**URL 구조:**
```
https://www.notion.so/데이터베이스ID?v=뷰ID
```

**예시 URL:**
```
https://www.notion.so/2b7666fad63d80d489b4c85e204fba66?v=table-view-123
```

**데이터베이스 ID 추출 방법:**
- `www.notion.so/` **바로 다음**에 오는 부분
- `?v=` 또는 `?` **이전**까지의 부분
- 위 예시에서: `2b7666fad63d80d489b4c85e204fba66`

**자세한 가이드는 `NOTION_ID_GUIDE.md` 파일을 참고하세요!**

### 3-2. 데이터베이스에 통합 연결하기
1. 데이터베이스 페이지에서 우측 상단 "..." 메뉴 클릭
2. "Connections" 선택
3. 방금 만든 통합("면역공방 예약 시스템") 선택
4. 연결 완료!

---

## 4단계: 환경 변수 설정하기

### 4-1. 로컬 개발용 (.env.local 파일)
프로젝트 폴더에 `.env.local` 파일을 만들고 다음 내용 입력:

```
NOTION_API_KEY=여기에_2단계에서_복사한_토큰_붙여넣기
NOTION_DATABASE_ID=여기에_3단계에서_확인한_데이터베이스_ID_붙여넣기
```

**예시:**
```
NOTION_API_KEY=secret_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
NOTION_DATABASE_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### 4-2. Vercel 배포용 환경 변수 설정
1. Vercel 대시보드 접속: https://vercel.com
2. 프로젝트 선택: `immun-2`
3. "Settings" 탭 클릭
4. "Environment Variables" 섹션으로 이동
5. 다음 변수 추가:
   - **Key**: `NOTION_API_KEY`
   - **Value**: 2단계에서 복사한 토큰
   - **Environment**: Production, Preview, Development 모두 선택
   - "Save" 클릭
6. 다시 추가:
   - **Key**: `NOTION_DATABASE_ID`
   - **Value**: 3단계에서 확인한 데이터베이스 ID
   - **Environment**: Production, Preview, Development 모두 선택
   - "Save" 클릭

---

## 5단계: 코드 수정하기

코드는 제가 수정해드리겠습니다. 위 단계를 완료하신 후 알려주시면 진행하겠습니다!

---

## ✅ 확인 체크리스트

- [ ] 노션 데이터베이스 생성 완료
- [ ] 데이터베이스 속성(컬럼) 설정 완료
- [ ] 노션 API 토큰 발급 완료
- [ ] 데이터베이스 ID 확인 완료
- [ ] 데이터베이스에 통합 연결 완료
- [ ] 로컬 `.env.local` 파일 생성 완료
- [ ] Vercel 환경 변수 설정 완료

위 항목들을 모두 완료하셨다면 알려주세요!

