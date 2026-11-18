# 나노탄소재료 연구실 홈페이지 (Nano Carbon Materials Lab)

숭실대학교 신소재공학과 나노탄소재료 연구실 홈페이지입니다.
기존 Wix 사이트(https://nanocarbon.wixsite.com/nanocarbon)의 내용을 옮겨 **GitHub Pages**에서 무료로 운영할 수 있게 새로 만든 정적 웹사이트입니다.

- 서버나 데이터베이스가 필요 없습니다. GitHub에 파일을 올리면 사이트가 자동으로 만들어져 배포됩니다.
- 구성원·논문·특허·갤러리는 **JSON 파일**로, 연구 소개·공지는 **Markdown 파일**로 관리합니다.
- 사진이 없으면 자리에 "이미지 준비 중" 상자가 보입니다. **정해진 파일 이름으로 사진을 올리면** 그대로 반영됩니다.

> 자세한 안내 문서
> - [docs/IMAGE_GUIDE.md](docs/IMAGE_GUIDE.md): 사진 교체 안내표 (위치·경로·비율·해상도)
> - [docs/BOARD_GUIDE.md](docs/BOARD_GUIDE.md): **Board(공지·갤러리·동영상) 올리기** — 수정할 파일, 사진 위치, 복사용 템플릿(`docs/templates/`)
> - [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md): 구성원·논문·특허·공지·갤러리·동영상 추가 방법
> - [docs/MIGRATION_REPORT.md](docs/MIGRATION_REPORT.md): 기존 사이트 이전 상태표, 검증 결과, 추가로 필요한 자료

---

## 1. 폴더 구조 한눈에 보기

```
nanocarbon-lab/
├─ src/
│  ├─ data/                ← ★ 자주 수정하는 데이터 (JSON)
│  │  ├─ site.json         연구실 이름, 주소, 이메일, 전화, 홈 소개문, 문의 안내
│  │  ├─ navigation.json   상단 메뉴 (Research · Members · Publications · Board · Contact us)
│  │  ├─ professor.json    교수 프로필
│  │  ├─ members.json      현재 구성원
│  │  ├─ alumni.json       졸업생
│  │  ├─ papers.json       논문
│  │  ├─ patents.json      특허
│  │  ├─ gallery.json      갤러리 앨범·사진
│  │  ├─ videos.json       동영상 (YouTube)
│  │  └─ images.json       로고, 홈 대표 이미지, About 이미지 등
│  ├─ content/             ← ★ 글 (Markdown)
│  │  ├─ research/         연구 분야 4개 (*.md)
│  │  ├─ notices/          공지사항 (*.md, _template.md 는 견본)
│  │  └─ pages/about.md    About us 소개문
│  ├─ pages/               화면(페이지) 코드 — 보통 수정할 필요 없음
│  ├─ components/          헤더·푸터·이미지·사진 확대 등 공통 부품
│  ├─ layouts/             공통 틀 (제목·공유 정보·favicon)
│  └─ styles/global.css    색상·글꼴·간격 (맨 위 :root 변수에서 색상 변경)
├─ public/                 ← ★ 사진·파일 (이 안의 파일은 주소 그대로 공개됨)
│  ├─ images/home/  about/  members/  research/  gallery/  common/
│  ├─ files/               다운로드용 첨부파일(PDF 등)
│  └─ favicon.svg          브라우저 탭 아이콘
├─ docs/                   안내 문서 (templates/ = 공지·갤러리·동영상 복사용 견본)
├─ scripts/check-images.mjs  사진 연결 상태 점검 도구
├─ .github/workflows/deploy.yml  GitHub Pages 자동 배포 설정
├─ astro.config.mjs        사이트 주소 설정 (자동 처리됨)
└─ package.json            필요한 프로그램 목록
```

---

## 2. 처음 공개하기 (웹 브라우저만으로 가능)

### 2-1. GitHub 저장소 만들기

1. https://github.com 에 로그인합니다. (계정이 없으면 Sign up)
2. 오른쪽 위 **+** → **New repository** 를 누릅니다.
3. **Repository name** 을 정합니다. 이 이름이 사이트 주소를 결정합니다.
   | 저장소 이름 | 사이트 주소 |
   |---|---|
   | `nanocarbon-lab` (아무 이름) | `https://사용자명.github.io/nanocarbon-lab/` |
   | `사용자명.github.io` (정확히 이 형식) | `https://사용자명.github.io/` |

   어느 쪽을 골라도 CSS·사진·링크·다운로드 경로가 자동으로 맞춰집니다. 따로 설정을 바꿀 필요가 없습니다.
4. **Public** 을 선택합니다. 무료 계정에서 Pages를 쓰려면 Public이어야 합니다.
5. 나머지는 그대로 두고 **Create repository** 를 누릅니다.

### 2-2. 프로젝트 파일 올리기

1. 받은 `nanocarbon-lab.zip` 의 압축을 풉니다.
2. 새 저장소 화면에서 **uploading an existing file** 링크를 누릅니다.
   (이미 파일이 있는 저장소라면 **Add file → Upload files**)
3. 압축을 푼 `nanocarbon-lab` 폴더 **안의 내용 전체**(`src`, `public`, `docs`, `.github`, `package.json` …)를 끌어다 놓습니다.
   - ⚠️ **`.github` 폴더가 꼭 함께 올라가야 자동 배포가 됩니다.** 이름이 점(.)으로 시작해 숨김 파일로 취급될 수 있습니다.
     - macOS Finder: `Cmd + Shift + .` 을 누르면 숨김 파일이 보입니다.
     - Windows: 탐색기 **보기 → 숨긴 항목** 을 체크합니다.
   - `node_modules`, `dist` 폴더는 올리지 않습니다. 압축 파일에는 들어 있지 않습니다.
4. 아래 **Commit changes** 를 누릅니다.

> 💡 업로드한 뒤 저장소 첫 화면에 `.github` 폴더가 보이는지 확인하세요. 보이지 않으면 **Add file → Create new file** 에서 이름 칸에 `.github/workflows/deploy.yml` 을 입력하고, 프로젝트의 같은 파일 내용을 복사해 붙여 넣어 커밋하면 됩니다.

### 2-3. GitHub Pages 켜기

1. 저장소의 **Settings** 탭 → 왼쪽 **Pages** 를 엽니다.
2. **Build and deployment → Source** 를 **GitHub Actions** 로 선택합니다. 저장 버튼은 따로 없습니다.

### 2-4. 배포 확인

1. 저장소의 **Actions** 탭에서 `Deploy to GitHub Pages` 실행을 확인합니다. 보통 1~3분 걸립니다.
   - 초록색 ✔ 이면 성공입니다.
   - 2-3단계 전에 파일을 올렸다면 첫 실행이 실패(빨간 ✕)했을 수 있습니다. 왼쪽 **Deploy to GitHub Pages** → 오른쪽 **Run workflow** 를 눌러 다시 실행하세요.
2. **Settings → Pages** 위쪽에 표시되는 주소(`Your site is live at …`)로 접속합니다.
3. 메뉴 이동, `…/members/alumni/` 같은 하위 주소 직접 접속과 새로고침이 정상인지 확인합니다.

---

## 3. 내용 수정 → 자동 재배포

수정 방법과 관계없이 **main 브랜치에 커밋하면 1~3분 뒤 자동으로 다시 배포**됩니다.

### 웹에서 글·데이터 고치기
1. 저장소에서 고칠 파일을 엽니다. (예: `src/data/members.json`)
2. 오른쪽 위 연필 아이콘(✏️ **Edit this file**)을 누릅니다.
3. 내용을 고치고 **Commit changes…** → **Commit changes** 를 누릅니다.
4. **Actions** 탭에서 ✔ 를 확인한 뒤 사이트를 새로고침합니다. 바로 바뀌지 않으면 `Ctrl+F5`(Mac: `Cmd+Shift+R`)를 누르세요.

> JSON 파일은 쉼표·따옴표가 하나만 틀려도 빌드가 실패합니다. 실패하면 Actions 기록에서 오류 줄 번호를 확인하세요. [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)의 예시를 그대로 복사해 고치면 안전합니다.

### 사진 추가·교체하기
1. [docs/IMAGE_GUIDE.md](docs/IMAGE_GUIDE.md)에서 넣을 사진의 **경로와 파일 이름**을 확인합니다. (예: `public/images/members/ryu-sh.jpg`)
2. 저장소에서 해당 폴더(예: `public/images/members`)로 이동합니다. → **Add file → Upload files**
3. 사진 파일 이름을 **안내표와 똑같이** 바꾼 뒤 끌어다 놓고 **Commit changes** 를 누릅니다.
   - 확장자는 `.jpg`, `.png`, `.webp` 중 무엇이든 됩니다. 이름만 같으면 자동으로 인식합니다.
   - 같은 이름의 사진을 다시 올리면 교체됩니다.
   - 새 폴더(예: 갤러리 앨범 폴더)는 업로드 화면에서 **폴더째 끌어다 놓으면** 만들어집니다.
4. 자동 배포가 끝나면 "이미지 준비 중" 자리에 사진이 보입니다.

### Claude에게 사진을 맡길 때
사진을 대화에 첨부하고 이렇게 요청하면 됩니다.
> "첨부한 사진을 류상혁 구성원 사진(`public/images/members/ryu-sh.jpg`)으로 넣어 줘. 3:4 비율에 맞게 크기도 줄여 줘."

Claude가 파일을 프로젝트에 저장하고 경로를 연결해 줍니다. 결과 파일을 같은 경로에 업로드하면 반영됩니다.

---

## 4. 내 컴퓨터에서 미리 보기 (선택)

GitHub 웹 화면만으로도 운영할 수 있습니다. 올리기 전에 미리 확인하고 싶을 때만 사용하세요.

1. [Node.js](https://nodejs.org) **24 LTS** 이상을 설치합니다. (22.23.4 이상이면 동작)
2. 터미널(명령 프롬프트)에서 프로젝트 폴더로 이동한 뒤 다음을 실행합니다.

```bash
npm install            # 처음 한 번 (필요한 프로그램 설치)
npm run dev            # 개발 서버 → 브라우저에서 http://localhost:4321 열기
npm run build          # 배포용 파일 생성 → dist/ 폴더
npm run preview        # 만든 결과를 미리 보기
npm run check:images   # 사진이 연결된 자리 / 비어 있는 자리 목록 출력
```

- `npm run dev` 화면에서는 비어 있는 사진 자리마다 **넣어야 할 파일 경로**가 작게 표시됩니다. 공개 사이트에는 표시되지 않습니다.
- 저장소 하위 경로 배포를 미리 시험하려면 다음처럼 실행합니다.
  `BASE_PATH=/nanocarbon-lab npm run build && npm run preview`

---

## 5. 설정값 위치

| 바꾸고 싶은 것 | 위치 |
|---|---|
| 연구실 이름, 주소, 이메일, 전화, 소개문 | `src/data/site.json` |
| 상단 메뉴 이름·순서 | `src/data/navigation.json` |
| 홈 '최근 소식' 개수 | `src/pages/index.astro` 의 `RECENT_LIMIT` (기본 4) |
| 사이트 주소·하위 경로 | 자동. 직접 지정하려면 `astro.config.mjs` 의 `SITE_URL`, `BASE_PATH` |
| 공유 미리보기 이미지 | `public/images/common/og-image.jpg` (1200×630) 추가 |
| 브라우저 탭 아이콘(favicon) | `public/favicon.svg` 교체 (같은 이름의 SVG 파일) |
| 로고 | `public/images/common/logo.png` 추가 → 글자 로고 대신 표시 |
| 색상 | `src/styles/global.css` 맨 위 `:root` 의 `--accent`(청록), `--ink`(네이비) 등 |
| 글꼴 | 기본 Pretendard(웹 글꼴). 외부 글꼴을 끄려면 `site.json` 의 `"fontCdn": false` |
| 페이지 제목·설명 | 각 페이지 파일(`src/pages/…`)의 `<BaseLayout title=… description=…>` |
| 지도 검색어 | `site.json` 의 `mapQuery` |

**직접 구입한 도메인을 쓸 때:** Settings → Pages → Custom domain 에 도메인을 입력하고, 도메인 업체에서 DNS를 GitHub 안내대로 설정합니다. 배포 설정이 주소를 자동으로 반영합니다.

---

## 6. 문제 해결

| 증상 | 해결 |
|---|---|
| Actions가 빨간 ✕ | 실패한 실행 → `build` → 빨간 단계를 펼쳐 오류를 확인합니다. 대부분 JSON의 쉼표·따옴표 오류입니다. |
| Actions 탭에 실행 기록이 없음 | `.github/workflows/deploy.yml` 이 올라갔는지 확인합니다(2-2 참고). |
| 사이트가 404 | Settings → Pages 의 Source 가 **GitHub Actions** 인지, 배포가 ✔ 인지 확인합니다. |
| 디자인(CSS)이 깨짐 | 직접 base 경로를 바꾸지 않았는지 확인합니다. 기본 설정이면 자동으로 맞춰집니다. |
| 사진을 올렸는데 안 바뀜 | ① 파일 이름 철자·폴더를 안내표와 비교 ② 배포 완료 확인 ③ 강력 새로고침(`Ctrl+F5`) |
| 사진이 너무 크게 잘림 | 인물·행사 사진은 해당 데이터의 `"focus": "50% 20%"` 로 보이는 중심을 조정합니다(가로% 세로%). |

---

## 7. 기술 구성

- [Astro](https://astro.build) 정적 사이트 생성기: 모든 페이지를 HTML로 미리 만들어 하위 주소 직접 접속·새로고침도 404 없이 동작합니다.
- JavaScript는 메뉴, 논문 검색, 사진 확대, 문의 메일 작성에만 사용합니다. JS가 꺼져도 내용은 모두 보입니다.
- 관리자 시스템·데이터베이스·로그인 없음.
