# Vercel 배포 가이드

## 1단계: GitHub 저장소 생성

1. GitHub에 로그인하고 새 저장소 생성
   - https://github.com/new 접속
   - 저장소 이름: `immun-2` (또는 원하는 이름)
   - Public 또는 Private 선택
   - README, .gitignore, license는 추가하지 않음 (이미 있음)

## 2단계: 로컬 저장소를 GitHub에 연결

터미널에서 다음 명령어 실행:

```bash
# GitHub 저장소 URL을 원격 저장소로 추가 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/immun-2.git

# 브랜치 이름을 main으로 변경
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 3단계: Vercel에 배포

### 방법 1: Vercel 웹사이트를 통한 배포 (권장)

1. **Vercel 계정 생성**
   - https://vercel.com 접속
   - "Sign Up" 클릭
   - GitHub 계정으로 로그인 (권장)

2. **프로젝트 가져오기**
   - Vercel 대시보드에서 "Add New..." → "Project" 클릭
   - GitHub 저장소 목록에서 `immun-2` 선택
   - "Import" 클릭

3. **프로젝트 설정**
   - Framework Preset: Next.js (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `pnpm run build` (자동 설정됨)
   - Output Directory: `.next` (자동 설정됨)
   - Install Command: `pnpm install` (자동 설정됨)

4. **환경 변수 설정** (필요한 경우)
   - 현재는 환경 변수가 없으므로 이 단계는 건너뛰어도 됩니다
   - 나중에 카카오맵 API 키 등을 추가할 경우 여기서 설정

5. **배포**
   - "Deploy" 버튼 클릭
   - 배포가 완료되면 자동으로 URL이 생성됩니다 (예: `immun-2.vercel.app`)

### 방법 2: Vercel CLI를 통한 배포

터미널에서 다음 명령어 실행:

```bash
# Vercel CLI 설치 (전역)
pnpm add -g vercel

# 또는 npm 사용 시
npm install -g vercel

# Vercel에 로그인
vercel login

# 프로젝트 디렉토리에서 배포
vercel

# 프로덕션 배포
vercel --prod
```

## 4단계: 배포 확인

- 배포가 완료되면 Vercel 대시보드에서 제공하는 URL로 접속하여 확인
- 자동으로 HTTPS가 적용됩니다
- 커밋을 푸시할 때마다 자동으로 재배포됩니다 (GitHub 연동 시)

## 주의사항

1. **환경 변수**: 나중에 API 키 등을 사용할 경우 Vercel 대시보드의 Environment Variables에서 설정해야 합니다.

2. **이미지 파일**: `public/images/image.png` 파일이 커밋되어 있는지 확인하세요. 파일이 너무 크면 Git LFS를 사용하거나 이미지 최적화를 고려하세요.

3. **자동 배포**: GitHub 저장소와 연결하면, `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다.

4. **도메인 설정**: Vercel 대시보드에서 커스텀 도메인을 추가할 수 있습니다.

## 문제 해결

- 배포 실패 시: Vercel 대시보드의 "Deployments" 탭에서 로그 확인
- 빌드 오류: 로컬에서 `pnpm run build` 실행하여 확인
- 환경 변수 오류: Vercel 대시보드의 Environment Variables 확인

