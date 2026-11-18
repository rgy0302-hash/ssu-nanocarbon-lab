# 콘텐츠 추가·수정 안내

> 공지·갤러리·동영상(Board) 올리기는 [BOARD_GUIDE.md](BOARD_GUIDE.md)에 단계별로 정리되어 있고, 복사용 템플릿은 [`docs/templates/`](templates/) 에 있습니다.

모든 수정은 GitHub 웹에서 파일을 열고 연필(✏️) 아이콘 → 수정 → **Commit changes** 순서로 합니다. 커밋하면 1~3분 뒤 자동으로 사이트에 반영됩니다.

## JSON 파일 기본 규칙 (꼭 읽어 주세요)

- 글자는 반드시 **큰따옴표** `"…"` 로 감쌉니다.
- 항목과 항목 사이에는 **쉼표** `,` 가 필요하고, **마지막 항목 뒤에는 쉼표가 없어야** 합니다.
- 숫자(연도)는 따옴표 없이 씁니다: `"year": 2025`
- 값이 없으면 빈 글자 `""` 또는 `null` 로 둡니다.
- 새 항목은 기존 항목 하나를 `{` 부터 `}` 까지 복사해 붙여 넣은 뒤 내용만 바꾸면 안전합니다.
- 수정 후 빌드가 실패하면(Actions 빨간 ✕) 대부분 쉼표나 따옴표 문제입니다. https://jsonlint.com 에 내용을 붙여 넣으면 틀린 줄을 알려 줍니다.

---

## 1. 현재 구성원 — `src/data/members.json`

```json
{
  "name": "홍길동",
  "nameEn": "G.D Hong",
  "group": "ms",
  "course": "석사과정 1",
  "research": "Anode-free battery",
  "email": "gildong@example.com",
  "photo": { "src": "/images/members/hong-gd.jpg", "alt": "홍길동 사진", "focus": "50% 30%" }
}
```

| 필드 | 설명 |
|---|---|
| `group` | 소속 묶음. `phd`(박사과정), `ms`(석사과정), `undergrad`(학부연구생) 중 하나. 위쪽 `groups` 목록에 새 묶음(예: 연구원 `researcher`)을 추가할 수도 있습니다. |
| `course` | 카드에 표시되는 과정명 (자유 입력) |
| `research` | 연구 분야. 비워 두면 표시하지 않습니다. |
| `photo.src` | 사진 경로. 이 이름으로 `public/images/members/` 에 사진을 올립니다. |

- 순서: 목록에 적힌 순서대로 표시됩니다.
- **졸업 처리:** 해당 항목을 `members.json` 에서 지우고 `alumni.json` 에 추가합니다.

## 2. 졸업생 — `src/data/alumni.json`

```json
{ "name": "홍길동", "year": 2026, "degree": "M.S.", "topic": "학위 논문 제목", "affiliation": "진로(회사·기관)" }
```

- `year` 에 졸업 연도를 넣으면 **연도별 묶음과 연도 선택 상자가 자동으로 생깁니다.** 연도를 모르면 `null` 로 둡니다. 이 경우 '졸업 연도 미확인' 묶음에 표시됩니다.
- 현재 기존 사이트에서 옮긴 35명은 졸업 연도·학위 정보가 원본에 없어 비어 있습니다.

## 3. 교수 프로필 — `src/data/professor.json`

학력은 `education`, 경력은 `career`, 연구 분야는 `researchInterests`, 산학협력 분야는 `industryAreas` 에 있습니다. 연도는 `year` / `period` 칸에 입력하면 함께 표시됩니다.

```json
{ "position": "교수", "org": "숭실대학교 신소재공학과", "period": "2005 – 현재" }
```

## 4. 논문 — `src/data/papers.json`

목록 **맨 위**에 새 논문을 추가하세요. 화면에서는 연도별(최신 연도 먼저)로 묶이고, 같은 연도 안에서는 **파일에 적힌 순서(위쪽이 먼저)**대로 표시됩니다.

```json
{
  "no": 98,
  "year": 2026,
  "title": "논문 제목",
  "authors": "A Kim, B Lee, Y Jeong",
  "journal": "Carbon",
  "detail": "250, 120000",
  "link": "https://doi.org/10.xxxx/xxxxx"
}
```

| 필드 | 설명 |
|---|---|
| `no` | 관리용 고유 번호(기존 최대값 + 1). 화면의 [97] 같은 번호는 자동으로 다시 매겨집니다. |
| `year` | 연도별 묶음·검색에 사용 |
| `detail` | 권(호), 페이지 등 원문 표기 그대로 |
| `link` | DOI 또는 원문 주소. **없으면 `""`** 로 둡니다. 임의 주소를 넣지 마세요. |
| `note` | (선택) 표지 선정 등 강조 문구. 예: `"Featured as a front cover image"` |
| `check` | (내부 메모) 사이트에는 표시되지 않습니다. 이전 과정에서 확인이 필요한 항목에 적어 두었습니다. |
| `originalSection` | (내부 메모) 기존 Wix 페이지의 연도 구분 |

- 페이지 상단의 총 편수, 연도별 편수, 홈의 '최신 논문'과 통계 숫자는 이 파일에서 **자동 계산**됩니다.

## 5. 특허 — `src/data/patents.json`

```json
{
  "no": 72,
  "region": "domestic",
  "country": "대한민국",
  "title": "특허 명칭",
  "number": "10-2026-0000000",
  "year": 2026,
  "status": null,
  "link": null
}
```

| 필드 | 설명 |
|---|---|
| `region` | `domestic`(국내) 또는 `overseas`(해외). 국내/해외 필터에 사용 |
| `year` | 연도별 묶음. 현재 값은 **출원번호에 표기된 연도**입니다. 미국 번호처럼 연도가 없으면 `null` |
| `status` | 원문에서 확인된 경우에만 `"등록"` 또는 `"출원"` 을 입력합니다. `null` 이면 표시하지 않습니다. |
| `link` | KIPRIS·Google Patents 등 상세 주소 (선택) |

## 6. 공지사항 — `src/content/notices/*.md`

1. `src/content/notices/` 폴더로 이동해 **Add file → Create new file** 을 누릅니다.
2. 파일 이름은 `2026-03-02-recruit.md` 처럼 **날짜-영문.md** 로 짓습니다. 이 이름이 공지 주소가 됩니다.
3. `_template.md` 의 내용을 복사해 붙여 넣고 수정합니다.

```markdown
---
title: 2026학년도 2학기 학부연구생 모집
date: 2026-08-20
summary: 학부연구생을 모집합니다.
pinned: true
attachments:
  - { label: 모집 안내문 (PDF), file: /files/recruit-2026-2.pdf }
---

본문을 작성합니다. **굵게**, [링크](https://example.com), 목록(- 항목)을 쓸 수 있습니다.
```

- 첨부파일은 `public/files/` 에 올리고 `file:` 에 `/files/파일이름` 으로 적습니다.
- `draft: true` 로 두면 게시되지 않습니다. 파일 이름이 `_` 로 시작해도 게시되지 않습니다.
- 공지가 하나도 없으면 "등록된 공지사항이 없습니다"가 표시됩니다.
- 공지를 지우려면 해당 `.md` 파일을 삭제합니다(파일 화면 오른쪽 위 `…` → Delete file).

## 7. 갤러리 — `src/data/gallery.json`

**앨범 추가:** `albums` 목록의 **맨 위**에 추가합니다. Board 첫 화면과 홈 '최근 소식'에는 날짜(없으면 앨범 id 앞 연도) 순으로 표시됩니다. 자세한 규칙은 [BOARD_GUIDE.md](BOARD_GUIDE.md) 참고.

```json
{
  "id": "2026-fall-workshop",
  "title": "2026 추계 워크샵",
  "date": "2026.10.10",
  "description": "한 줄 설명 (선택)",
  "photos": [
    { "src": "/images/gallery/2026-fall-workshop/01.jpg", "alt": "2026 추계 워크샵 단체 사진", "caption": "", "focus": "50% 50%" },
    { "src": "/images/gallery/2026-fall-workshop/02.jpg", "alt": "2026 추계 워크샵 발표 모습", "caption": "", "focus": "50% 50%" }
  ]
}
```

- `id` 는 영문·숫자·하이픈만 사용합니다. 앨범 주소(`/gallery/#id`)와 사진 폴더 이름으로 씁니다.
- 사진은 `public/images/gallery/<id>/01.jpg, 02.jpg …` 로 올립니다.
- 사진을 누르면 크게 보기가 열리고, 이전/다음 버튼, 키보드 ←/→/Esc, 휴대폰 좌우 밀기로 넘길 수 있습니다.

## 8. 연구 분야 — `src/content/research/*.md`

각 파일 위쪽 `---` 사이가 설정, 아래가 본문(Markdown)입니다.

```markdown
---
order: 1                     # 표시 순서
title: CNT Assembly           # 영문 제목
titleKo: 탄소나노튜브 시트 및 섬유 제조
summary: 홈·목록 카드에 보일 한 줄 소개
cover: { src: /images/research/cnt-assembly/cover.jpg, alt: 대표 이미지 설명, fit: cover }
images:
  - { src: /images/research/cnt-assembly/01.png, alt: 공정 도식, caption: "그림 설명", fit: contain }
  - { src: /images/research/cnt-assembly/09.jpg, alt: 새 이미지, caption: "", fit: contain }
---

본문 내용 (문단, - 목록, ### 소제목)
```

- 이미지를 늘리려면 `images:` 아래에 줄을 추가하고, 같은 이름의 파일을 올립니다.
- 연구 도식·그래프는 `fit: contain` 으로 두면 잘리지 않습니다.
- **새 연구 분야 추가:** 파일을 복사해 `new-topic.md` 처럼 이름을 바꾸면 `/research/new-topic/` 페이지가 생깁니다. 상단 메뉴에도 보이게 하려면 `src/data/navigation.json` 의 Research `children` 에 `{ "label": "New Topic", "href": "/research/new-topic/" }` 를 추가합니다.

## 9. 동영상 — `src/data/videos.json`

```json
{ "youtubeId": "MfAQ-dR13XI", "title": "영상 제목", "date": "2026-05-18", "description": "" }
```

`youtubeId` 는 YouTube 주소 `https://www.youtube.com/watch?v=` **뒤의 11글자**입니다. 영상은 자동 재생되지 않으며, 'YouTube에서 보기' 링크가 함께 표시됩니다.

## 10. 연락처·문의 — `src/data/site.json`

- `email`, `phone`(화면 표시), `phoneLink`(전화 걸기용 국제 형식 `+82-2-…`), `address`, `office`
- `contact.downloads` 에 항목을 넣으면 Contact us 페이지에 다운로드 상자가 생깁니다.
  ```json
  "downloads": [ { "label": "연구실 소개 자료 (PDF)", "file": "/files/lab-introduction.pdf" } ]
  ```
  파일은 `public/files/lab-introduction.pdf` 로 올립니다.

### 문의 기능에 대하여
현재 문의 양식은 **방문자의 이메일 앱을 열어** 제목과 내용을 미리 채워 주는 방식입니다. 서버가 없으므로 사이트가 직접 메일을 보내지는 않습니다. 화면에도 그렇게 안내합니다.

사이트에서 바로 발송되는 양식이 필요하면(선택 사항) 다음 외부 서비스를 연결할 수 있습니다.
- [Formspree](https://formspree.io), [Getform](https://getform.io), [Web3Forms](https://web3forms.com) 등: 가입 후 받은 주소를 `<form action="…" method="POST">` 에 넣는 방식입니다.
- 연결할 때는 `src/pages/contact.astro` 의 `<form>` 과 아래 `<script>` 를 서비스 안내에 맞게 바꿔야 합니다. 이 작업이 필요하면 Claude에게 서비스 이름과 함께 요청하세요.
- 무료 요금제의 월 발송 한도와 스팸 방지 설정을 확인하세요.

## 11. 메뉴 — `src/data/navigation.json`

현재 상단 메뉴: **Research · Members · Publications · Board · Contact us** (Home 메뉴는 없고 로고를 누르면 홈으로 이동합니다.)

`label`(표시 이름)과 `href`(주소)를 바꾸거나 순서를 옮길 수 있습니다. 하위 메뉴는 `children` 에 넣습니다. 주소는 항상 `/` 로 시작하고 `/` 로 끝나게 적습니다(예: `/members/alumni/`).

- `"highlight": true` 가 붙은 메뉴(현재 Contact us)는 테두리 버튼 모양으로 강조됩니다.
- 하위 메뉴 주소가 상위 주소와 달라도 됩니다(예: Board 아래 `/notice/`). 그 페이지에 있으면 상위 메뉴(Board)가 선택된 상태로 표시됩니다.
- About us(`/about/`)는 상단 메뉴에서 빠졌지만 페이지는 그대로이며, 홈 소개 영역의 '연구실 소개 (About us)' 버튼으로 연결됩니다. 소개문은 `src/content/pages/about.md` 에서 고칩니다.
