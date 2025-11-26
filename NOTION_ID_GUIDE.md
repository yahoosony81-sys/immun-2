# 노션 데이터베이스 ID 찾기 가이드

## 📍 노션 데이터베이스 ID 위치

노션 데이터베이스 ID는 브라우저 주소창의 URL에서 찾을 수 있습니다.

## 🔍 단계별 확인 방법

### 1단계: 노션 데이터베이스 페이지 열기

1. 노션(https://www.notion.so)에 로그인
2. 예약 관리용 데이터베이스 페이지를 엽니다
3. 브라우저 주소창을 확인하세요

### 2단계: URL 구조 이해하기

노션 데이터베이스 URL은 다음과 같은 형식입니다:

```
https://www.notion.so/데이터베이스ID?v=뷰ID
```

또는

```
https://www.notion.so/데이터베이스ID
```

### 3단계: 데이터베이스 ID 추출하기

**예시 URL:**
```
https://www.notion.so/2b7666fad63d80d489b4c85e204fba66?v=abc123def456
```

**데이터베이스 ID는:**
- URL에서 `www.notion.so/` **바로 다음**에 오는 부분
- `?v=` 또는 `?` **이전**까지의 부분
- **32자리 문자** (하이픈 없이)

**위 예시에서:**
- ✅ 데이터베이스 ID: `2b7666fad63d80d489b4c85e204fba66`
- ❌ 뷰 ID: `abc123def456` (이건 필요 없음)

## 📝 실제 예시

### 예시 1: 기본 URL
```
URL: https://www.notion.so/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
데이터베이스 ID: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 예시 2: 뷰 파라미터가 있는 URL
```
URL: https://www.notion.so/2b7666fad63d80d489b4c85e204fba66?v=table-view-123
데이터베이스 ID: 2b7666fad63d80d489b4c85e204fba66
```

### 예시 3: 여러 파라미터가 있는 URL
```
URL: https://www.notion.so/2b7666fad63d80d489b4c85e204fba66?v=table&filter=...
데이터베이스 ID: 2b7666fad63d80d489b4c85e204fba66
```

## ⚠️ 주의사항

### 1. 하이픈(-) 포함 여부
- 노션 URL에는 하이픈이 **없습니다**
- 하지만 일부 경우 하이픈이 포함된 형식도 있습니다:
  ```
  URL: https://www.notion.so/a1b2c3d4-e5f6-7890-abcd-ef1234567890
  데이터베이스 ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890 (하이픈 포함)
  ```
- **하이픈이 있으면 그대로 사용**하세요

### 2. URL 인코딩
- URL에 특수문자가 인코딩되어 있을 수 있습니다
- 브라우저 주소창에서 **복사**하면 자동으로 디코딩됩니다

### 3. 페이지 ID vs 데이터베이스 ID
- 일반 페이지의 ID와 데이터베이스 ID는 다릅니다
- **데이터베이스 페이지**의 URL만 사용하세요

## 🔧 ID 추출 방법

### 방법 1: 수동 추출
1. 브라우저 주소창에서 URL 전체 선택 (Ctrl+A)
2. 복사 (Ctrl+C)
3. 메모장에 붙여넣기
4. `www.notion.so/` 다음부터 `?` 또는 끝까지 복사

### 방법 2: 브라우저 개발자 도구 사용
1. F12 키로 개발자 도구 열기
2. Console 탭 클릭
3. 다음 코드 입력:
   ```javascript
   window.location.pathname.split('/').pop().split('?')[0]
   ```
4. Enter 키 누르면 ID가 표시됩니다

### 방법 3: URL에서 직접 확인
1. 주소창에서 `www.notion.so/` 다음 부분 확인
2. 예: `www.notion.so/2b7666fad63d80d489b4c85e204fba66`
3. `2b7666fad63d80d489b4c85e204fba66` 부분이 ID입니다

## ✅ 확인 체크리스트

- [ ] 노션 데이터베이스 페이지가 열려 있나요?
- [ ] 브라우저 주소창에 `www.notion.so/`가 보이나요?
- [ ] `www.notion.so/` 다음에 32자리 문자가 보이나요?
- [ ] `?v=` 또는 `?` 이전까지의 부분을 복사했나요?
- [ ] 복사한 ID를 `.env` 파일의 `NOTION_DATABASE_ID`에 붙여넣었나요?

## 🎯 현재 설정된 ID 확인

현재 `.env` 파일에 설정된 ID:
```
NOTION_DATABASE_ID=2b7666fad63d80d489b4c85e204fba66
```

이 ID가 노션 URL의 `www.notion.so/` 다음 부분과 일치하는지 확인하세요!

## 💡 팁

- 데이터베이스 ID는 **대소문자를 구분하지 않습니다**
- ID는 변경되지 않으므로 한 번만 확인하면 됩니다
- 여러 데이터베이스가 있다면 각각의 ID가 다릅니다

