# Board 운영 안내 (공지 · 갤러리 · 동영상)

상단 메뉴 **Board** 는 연구실 게시물을 모아 보는 곳입니다. 별도 관리자 화면이나 데이터베이스 없이, GitHub에서 파일만 고치면 됩니다. 커밋하면 1~3분 뒤 자동으로 반영됩니다.

| 게시판 | 주소 | 수정할 파일 | 사진·파일 올릴 곳 | 복사용 템플릿 |
|---|---|---|---|---|
| Board 첫 화면 | `/board/` | (자동으로 모아 보여 줌 — 수정할 필요 없음) | — | — |
| Notice (공지) | `/notice/` | `src/content/notices/` 에 **새 .md 파일** 추가 | 첨부파일: `public/files/` | [`templates/notice.md`](templates/notice.md) |
| Gallery (사진) | `/gallery/` | `src/data/gallery.json` 의 `albums` 맨 위에 추가 | `public/images/gallery/<앨범 id>/01.jpg, 02.jpg …` | [`templates/gallery-album.json`](templates/gallery-album.json) |
| Videos (동영상) | `/videos/` | `src/data/videos.json` 의 `videos` 맨 위에 추가 | 올릴 파일 없음 (YouTube) | [`templates/video.json`](templates/video.json) |

> 기존 주소 `/notice/`, `/gallery/`, `/videos/` 는 그대로입니다. `/board/notice/` 처럼 입력해도 해당 페이지로 자동 이동합니다.

---

## 1. 공지 올리기

1. GitHub에서 `src/content/notices/` 폴더 → **Add file → Create new file**
2. 파일 이름: `2026-03-02-recruit.md` 처럼 **날짜-영문.md** (이 이름이 공지 주소가 됩니다: `/notice/2026-03-02-recruit/`)
3. [`templates/notice.md`](templates/notice.md) 내용을 붙여 넣고 `title`, `date`, 본문을 고칩니다. 맨 위 `#` 로 시작하는 설명 줄은 지워도 됩니다.
4. 첨부파일이 있으면 `public/files/` 에 먼저 올리고, `attachments` 의 `file:` 에 `/files/파일이름.pdf` 로 적습니다. 없으면 `attachments:` 두 줄을 지웁니다.
5. **Commit changes**

- `date` 는 실제 게시 날짜를 `YYYY-MM-DD` 로 적습니다. 목록·홈 정렬에 쓰입니다.
- `pinned: true` → 공지 목록 맨 위에 고정, `draft: true` → 게시하지 않음
- 삭제: 해당 `.md` 파일을 지웁니다.

## 2. 갤러리 앨범 올리기

1. **사진 먼저:** `public/images/gallery/` 폴더 → **Add file → Upload files** 에서 앨범 폴더를 통째로 끌어다 놓습니다.
   - 폴더 이름 = 앨범 `id` (영문·숫자·하이픈만, 예: `2026-fall-workshop`)
   - 사진 이름 = `01.jpg`, `02.jpg` … (가로 1600px 정도면 충분)
2. `src/data/gallery.json` 을 열어 연필(✏️) → `"albums": [` 바로 **다음 줄**에 [`templates/gallery-album.json`](templates/gallery-album.json) 내용을 붙여 넣습니다.
3. 붙여 넣은 `}` 뒤에 **쉼표 `,`** 를 붙입니다(다음 앨범과 구분).
4. `id`, `title`, 사진 수만큼 `photos` 줄을 맞춥니다. 사진의 `alt` 에는 사진 설명을 적습니다.
5. **Commit changes**

- `date` 는 아는 경우에만 `"2026.10.10"` 처럼 적습니다. 모르면 `""` 로 둡니다(지어내지 않기).
- `description` 은 앨범 아래 한 줄 설명입니다(선택).

## 3. 동영상 올리기

1. YouTube 주소 `https://www.youtube.com/watch?v=MfAQ-dR13XI` 에서 `v=` 뒤 **11글자**(`MfAQ-dR13XI`)가 `youtubeId` 입니다.
2. `src/data/videos.json` → `"videos": [` 다음 줄에 [`templates/video.json`](templates/video.json) 내용을 붙이고 끝에 쉼표 `,` 를 붙입니다.
3. `date` 는 YouTube 게시일을 `YYYY-MM-DD` 로 적습니다(모르면 `""`).

---

## Board 첫 화면과 홈 '최근 소식'은 어떻게 정해지나요?

공지·갤러리·동영상을 한 목록으로 합쳐 **최신순**으로 보여 줍니다. 날짜를 임의로 만들지 않습니다.

1. `date` 가 입력된 게시물은 그 날짜 순서로 정렬합니다.
2. 날짜가 없는 갤러리 앨범은 **앨범 id 앞의 연도**(예: `2026-…`)로만 정렬합니다. 같은 연도 안에서는 날짜가 있는 게시물이 먼저, 그다음은 파일에 적힌 순서(위쪽 먼저)입니다.
3. 화면에는 실제로 입력된 날짜만 표시합니다.

| 설정 | 위치 |
|---|---|
| 홈 '최근 소식' 개수 (기본 4) | `src/pages/index.astro` 의 `RECENT_LIMIT` |
| Board '최근 게시물' 개수 (기본 8) | `src/pages/board/index.astro` 의 `LIMIT` |
| Board 하위 메뉴 이름·순서 | `src/data/navigation.json` 의 Board `children` |

- 게시물이 하나도 없으면 홈의 '최근 소식' 영역은 자동으로 숨겨지고, 최신 논문이 넓게 표시됩니다.
- 갤러리 사진이 아직 없으면 '이미지 준비 중' 상자가 보입니다. 같은 경로에 사진을 올리면 바로 바뀝니다.

## 자주 하는 실수

- JSON 에서 항목 사이 쉼표 누락, 마지막 항목 뒤 쉼표 → 빌드 실패(Actions 빨간 ✕). https://jsonlint.com 에 붙여 넣어 확인하세요.
- 사진 폴더 이름과 `id` 가 다름 → '이미지 준비 중'으로 표시됨. 철자·대소문자를 맞추세요.
- 공지 파일 이름을 `_` 로 시작 → 게시되지 않음(견본용 규칙).
