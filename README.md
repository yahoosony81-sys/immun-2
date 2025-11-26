# 면역공방 예약 웹페이지

마인드 피트니스 회원을 위한 면역공방 예약 시스템입니다.

## 주요 기능

1. **면역공방 서비스 소개** - 히어로 섹션에서 서비스 소개 및 첫 방문 50% 할인 안내
2. **예약하기** - 이름, 이메일, 전화번호, 희망 날짜/시간 입력으로 간편 예약
3. **예약 완료 및 계좌 안내** - 예약 접수 후 계좌번호 및 입금 안내
4. **예약 변경** - 이름과 전화번호로 예약 조회 후 변경/취소 요청
5. **위치 안내** - 면역공방 주소 및 지도 표시

## 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form** (폼 관리)
- **Zod** (폼 검증)
- **React DatePicker** (날짜 선택)

## 설치 및 실행

### 1. 패키지 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
immun-2/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 메인 랜딩 페이지
│   ├── reservation/       # 예약 관련 페이지
│   └── modify/            # 예약 변경 페이지
├── components/            # 재사용 컴포넌트
│   ├── HeroSection.tsx    # 히어로 섹션
│   ├── ReservationForm.tsx # 예약 폼
│   ├── ModifyButton.tsx   # 예약 변경 버튼
│   └── LocationMap.tsx    # 위치 지도
├── lib/                   # 유틸리티 함수
│   └── api.ts            # 예약 데이터 저장/조회
└── types/                 # TypeScript 타입 정의
```

## 주요 페이지

- `/` - 메인 랜딩 페이지 (서비스 소개)
- `/reservation` - 예약 폼 페이지
- `/reservation/complete` - 예약 완료 페이지
- `/modify` - 예약 변경 페이지

## 데이터 저장

현재는 브라우저의 로컬 스토리지를 사용하여 예약 데이터를 저장합니다. 
실제 프로덕션 환경에서는 다음 중 하나를 사용하는 것을 권장합니다:

- Supabase (무료 PostgreSQL)
- Google Sheets API
- 자체 백엔드 API

## 배포

Vercel에 배포하는 것을 권장합니다:

1. GitHub에 코드 푸시
2. Vercel에 프로젝트 연결
3. 자동 배포 완료

## 주의사항

- 현재 계좌번호는 하드코딩되어 있습니다. 실제 사용 시 환경 변수나 설정 파일로 관리하세요.
- 지도 API 키가 필요합니다. Google Maps를 사용하는 경우 API 키를 설정해야 합니다.

