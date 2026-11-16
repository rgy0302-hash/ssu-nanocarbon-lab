# 이미지 교체 안내

사진은 **`public/images/` 아래 정해진 경로에 정해진 파일 이름으로 올리면** 자동으로 적용됩니다.
파일이 없으면 그 자리에 "이미지 준비 중" 상자가 표시되며, 깨진 이미지 아이콘이나 레이아웃 붕괴는 생기지 않습니다.

- 사진이 있는지는 **사이트를 만들(빌드할) 때** 확인합니다. 사진을 올린 뒤 자동 배포가 끝나야 반영됩니다.
- **확장자는 상관없습니다.** 안내표에 `01.jpg` 로 적혀 있어도 `01.png`, `01.webp` 를 올리면 인식합니다. 이름(확장자 앞부분)만 같으면 됩니다.
- 파일 이름에는 **영문 소문자·숫자·하이픈(-)** 만 쓰세요. 한글·띄어쓰기는 피합니다.
- 용량은 장당 **500KB 이하**를 권장합니다. JPG 품질 80% 정도로 저장하면 됩니다. 휴대폰 원본(5~10MB)은 줄여서 올리세요.
- Wix 이미지 주소는 사용하지 않습니다. 원본 파일을 직접 올려 주세요.
- 현재 상태는 `npm run check:images` 로 확인할 수 있습니다. 로컬에서 `npm run dev` 화면을 보면 빈 자리마다 넣어야 할 경로가 표시됩니다.

## 표시 방식 (데이터에서 지정)

| 값 | 의미 | 쓰는 곳 |
|---|---|---|
| `"fit": "cover"` | 틀을 꽉 채움. 가장자리가 잘릴 수 있음 | 인물, 행사, 대표 이미지 |
| `"fit": "contain"` | 잘리지 않게 전체 표시. 남는 공간은 밝은 회색 | 연구 도식, 그래프, 실험 사진 |
| `"focus": "50% 25%"` | cover에서 잘릴 때 남길 중심(가로% 세로%). 얼굴이 잘리면 세로 값을 줄이세요 | 인물 |
| `"alt": "…"` | 사진을 볼 수 없는 사용자(화면낭독기)를 위한 설명. 사진 내용을 짧게 적어 주세요 | 모든 사진 |
| `"caption": "…"` | 사진 아래 설명 (선택) | 연구 이미지, 갤러리 |

예) `src/data/members.json`
```json
"photo": { "src": "/images/members/ryu-sh.jpg", "alt": "류상혁 사진", "focus": "50% 30%" }
```

## 권장 비율·해상도 요약

| 종류 | 표시 비율 | 권장 해상도 | 비고 |
|---|---|---|---|
| 홈 대표 이미지 | 4:3 | 1600×1200 | cover |
| About 상단 이미지 | 16:10 | 1920×1200 이상 | 원본은 6000×1972 와이드. 넣으면 위아래가 잘리므로 focus 조정 |
| 연구 분야 대표(cover) | 16:10 / 4:3 | 1600×1000 | 홈 카드와 Research 목록에 사용 |
| 연구 도식·그래프 | 원본 비율 그대로 | 긴 변 1600~2000px | contain. 확대 시 전체 화면 |
| 교수 사진 | 3:4 세로 | 900×1200 | 얼굴이 위쪽 1/3에 오게 |
| 구성원 사진 | 3:4 세로 | 600×800 | 모두 같은 배경·비율이면 깔끔합니다 |
| Members 첫 화면 카드 | 4:3 | 1200×900 | 단체 사진 등 |
| 갤러리 사진 | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 썸네일은 가운데 기준으로 잘림 |
| 로고 | 가로형 | 높이 88px 이상, 투명 PNG | 넣으면 글자 로고 대신 표시 |
| 공유 미리보기(OG) | 1.91:1 | 1200×630 | 카카오톡·SNS 링크 미리보기 |
| favicon | 1:1 | SVG 또는 512×512 PNG | `public/favicon.svg` 교체 |

## 교체 방법

**GitHub 웹에서 올리기**
1. 저장소에서 아래 표의 폴더(예: `public/images/members`)로 이동합니다.
2. **Add file → Upload files** 를 누르고, 이름을 표와 똑같이 바꾼 사진을 끌어다 놓은 뒤 **Commit changes** 를 누릅니다.
3. **Actions** 탭에서 배포 완료(✔)를 확인합니다.

**Claude에게 맡기기**
사진을 첨부하고 "이 사진을 `public/images/gallery/2025-ksfe-busan/01.jpg` 로 넣어 줘"처럼 경로를 알려 주세요.

**사진 수를 늘리거나 줄이기**
갤러리·연구 이미지는 데이터 파일의 목록 항목을 추가·삭제하면 됩니다([CONTENT_GUIDE.md](CONTENT_GUIDE.md) 참고).

## 전체 이미지 자리 목록 (현재 68곳)

| 사용 위치 | 파일 경로 (public 폴더 기준) | 권장 비율 | 권장 해상도 | 교체 방법 / 데이터 파일 |
|---|---|---|---|---|
| 갤러리 사진 — 2026 개강 기념 회식 사진 1 | `public/images/gallery/2026-semester-dinner/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2026 대학원 입학식 사진 1 | `public/images/gallery/2026-graduate-entrance/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2026 대학원 입학식 사진 2 | `public/images/gallery/2026-graduate-entrance/02.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 종강 기념 회식 사진 1 | `public/images/gallery/2025-semester-end-dinner/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 한국섬유공학회 in 부산 사진 1 | `public/images/gallery/2025-ksfe-busan/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 한국섬유공학회 in 부산 사진 2 | `public/images/gallery/2025-ksfe-busan/02.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 한국섬유공학회 in 부산 사진 3 | `public/images/gallery/2025-ksfe-busan/03.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 스승의날 사진 1 | `public/images/gallery/2025-teachers-day/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 스승의날 사진 2 | `public/images/gallery/2025-teachers-day/02.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 스승의날 사진 3 | `public/images/gallery/2025-teachers-day/03.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2026 워크샵 in 속초 사진 1 | `public/images/gallery/2026-workshop-sokcho/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2026 워크샵 in 속초 사진 2 | `public/images/gallery/2026-workshop-sokcho/02.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2026 워크샵 in 속초 사진 3 | `public/images/gallery/2026-workshop-sokcho/03.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 학위수여식 사진 1 | `public/images/gallery/2025-graduation/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 신소재의 날 사진 1 | `public/images/gallery/2025-materials-day/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 정영진 교수님 장기근속 20주년 기념 행사 사진 1 | `public/images/gallery/2025-prof-20th-anniversary/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 정영진 교수님 장기근속 20주년 기념 행사 사진 2 | `public/images/gallery/2025-prof-20th-anniversary/02.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 한국전기화학회 in 제주도 사진 1 | `public/images/gallery/2025-kecs-jeju/01.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 한국전기화학회 in 제주도 사진 2 | `public/images/gallery/2025-kecs-jeju/02.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 갤러리 사진 — 2025 한국전기화학회 in 제주도 사진 3 | `public/images/gallery/2025-kecs-jeju/03.jpg` | 썸네일 4:3, 확대 시 원본 비율 | 긴 변 1600~2400px | 같은 이름으로 업로드 · `src/data/gallery.json` |
| 헤더 로고 — 나노탄소재료 연구실 로고 | `public/images/common/logo.png` | 가로형(예 3:1) | 높이 88px 이상, 투명 PNG | 같은 이름으로 업로드 · `src/data/images.json` |
| SNS 공유 미리보기 — 나노탄소재료 연구실 | `public/images/common/og-image.jpg` | 1.91:1 | 1200×630 | 같은 이름으로 업로드 · `src/data/images.json` |
| 홈 첫 화면 대표 이미지 — 탄소나노튜브 시트 연구 이미지 | `public/images/home/hero.jpg` | 4:3 (가운데 기준 잘림) | 1600×1200 | 같은 이름으로 업로드 · `src/data/images.json` |
| About us 상단 이미지 — 나노탄소재료 연구실 대표 이미지 | `public/images/about/banner.jpg` | 16:10 (잘림, focus 조정) | 1920×1200 이상 | 같은 이름으로 업로드 · `src/data/images.json` |
| About us 연구 이미지 — About us 연구 이미지 1 | `public/images/about/figure-01.png` | 비율 무관 (전체 표시) | 긴 변 1600px | 같은 이름으로 업로드 · `src/data/images.json` |
| About us 연구 이미지 — About us 연구 이미지 2 | `public/images/about/figure-02.jpg` | 비율 무관 (전체 표시) | 긴 변 1600px | 같은 이름으로 업로드 · `src/data/images.json` |
| About us 연구 이미지 — About us 연구 이미지 3 | `public/images/about/figure-03.jpg` | 비율 무관 (전체 표시) | 긴 변 1600px | 같은 이름으로 업로드 · `src/data/images.json` |
| About us 연구 이미지 — About us 연구 이미지 4 | `public/images/about/figure-04.jpg` | 비율 무관 (전체 표시) | 긴 변 1600px | 같은 이름으로 업로드 · `src/data/images.json` |
| About us 연구 이미지 — About us 연구 이미지 5 | `public/images/about/figure-05.jpg` | 비율 무관 (전체 표시) | 긴 변 1600px | 같은 이름으로 업로드 · `src/data/images.json` |
| Members 첫 화면 카드 — Professor | `public/images/members/landing-professor.jpg` | 4:3 (잘림) | 1200×900 | 같은 이름으로 업로드 · `src/data/images.json` |
| Members 첫 화면 카드 — 현재 구성원 단체 사진 | `public/images/members/landing-current.jpg` | 4:3 (잘림) | 1200×900 | 같은 이름으로 업로드 · `src/data/images.json` |
| Members 첫 화면 카드 — 졸업생 사진 | `public/images/members/landing-alumni.jpg` | 4:3 (잘림) | 1200×900 | 같은 이름으로 업로드 · `src/data/images.json` |
| 구성원 사진 — 착막츠이 닐류페르 사진 | `public/images/members/cakmakci-lee.jpg` | 3:4 세로 | 600×800 | 같은 이름으로 업로드 · `src/data/members.json` |
| 구성원 사진 — 최지인 사진 | `public/images/members/choi-ji.jpg` | 3:4 세로 | 600×800 | 같은 이름으로 업로드 · `src/data/members.json` |
| 구성원 사진 — 김가영 사진 | `public/images/members/kim-gy.jpg` | 3:4 세로 | 600×800 | 같은 이름으로 업로드 · `src/data/members.json` |
| 구성원 사진 — 정지원 사진 | `public/images/members/jeong-jw.jpg` | 3:4 세로 | 600×800 | 같은 이름으로 업로드 · `src/data/members.json` |
| 구성원 사진 — 정해정 사진 | `public/images/members/jeong-hj.jpg` | 3:4 세로 | 600×800 | 같은 이름으로 업로드 · `src/data/members.json` |
| 구성원 사진 — 류상혁 사진 | `public/images/members/ryu-sh.jpg` | 3:4 세로 | 600×800 | 같은 이름으로 업로드 · `src/data/members.json` |
| 구성원 사진 — 남현진 사진 | `public/images/members/nam-hj.jpg` | 3:4 세로 | 600×800 | 같은 이름으로 업로드 · `src/data/members.json` |
| 구성원 사진 — 김민석 사진 | `public/images/members/kim-ms.jpg` | 3:4 세로 | 600×800 | 같은 이름으로 업로드 · `src/data/members.json` |
| 교수 사진 — 정영진 교수 사진 | `public/images/members/professor.jpg` | 3:4 세로 (얼굴 위쪽 기준) | 900×1200 | 같은 이름으로 업로드 · `src/data/professor.json` |
| 연구 분야 대표 이미지(홈·Research) | `public/images/research/bulletproof/cover.jpg` | 16:10 / 4:3 (잘림) | 1600×1000 | 같은 이름으로 업로드 · `src/content/research/bulletproof.md` |
| 연구 상세 도식·사진 — 신형 방탄복 | `public/images/research/bulletproof/01.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/bulletproof.md` |
| 연구 상세 도식·사진 — 방탄 소재 연구 이미지 | `public/images/research/bulletproof/02.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/bulletproof.md` |
| 연구 상세 도식·사진 — 탄소나노튜브 필름을 이용한 방탄양복 | `public/images/research/bulletproof/03.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/bulletproof.md` |
| 연구 분야 대표 이미지(홈·Research) | `public/images/research/cnt-assembly/cover.jpg` | 16:10 / 4:3 (잘림) | 1600×1000 | 같은 이름으로 업로드 · `src/content/research/cnt-assembly.md` |
| 연구 상세 도식·사진 — CNT Assembly 공정 도식 | `public/images/research/cnt-assembly/01.png` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-assembly.md` |
| 연구 상세 도식·사진 — Research_CNT fiber_4 | `public/images/research/cnt-assembly/02.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-assembly.md` |
| 연구 상세 도식·사진 — Research_CNT fiber_5 | `public/images/research/cnt-assembly/03.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-assembly.md` |
| 연구 상세 도식·사진 — Research_CNT fiber_6 | `public/images/research/cnt-assembly/04.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-assembly.md` |
| 연구 상세 도식·사진 — Research_CNT fiber_3 | `public/images/research/cnt-assembly/05.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-assembly.md` |
| 연구 상세 도식·사진 — Research_CNT fiber_1 | `public/images/research/cnt-assembly/06.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-assembly.md` |
| 연구 상세 도식·사진 — Research_CNT fiber_2 | `public/images/research/cnt-assembly/07.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-assembly.md` |
| 연구 상세 도식·사진 — CNT Assembly 연구 사진 | `public/images/research/cnt-assembly/08.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-assembly.md` |
| 연구 분야 대표 이미지(홈·Research) | `public/images/research/cnt-heating-element/cover.jpg` | 16:10 / 4:3 (잘림) | 1600×1000 | 같은 이름으로 업로드 · `src/content/research/cnt-heating-element.md` |
| 연구 상세 도식·사진 — CNT 급속 발열체 도식 (그림1) | `public/images/research/cnt-heating-element/01.png` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-heating-element.md` |
| 연구 상세 도식·사진 — 탄소 재료들의 발열 성능 비교 (그림5) | `public/images/research/cnt-heating-element/02.png` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-heating-element.md` |
| 연구 상세 도식·사진 — CNT 필름 발열 실험 (그림2) | `public/images/research/cnt-heating-element/03.png` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-heating-element.md` |
| 연구 상세 도식·사진 — CNT 필름의 고온 발열 (그림3) | `public/images/research/cnt-heating-element/04.png` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/cnt-heating-element.md` |
| 연구 분야 대표 이미지(홈·Research) | `public/images/research/wearable-battery/cover.jpg` | 16:10 / 4:3 (잘림) | 1600×1000 | 같은 이름으로 업로드 · `src/content/research/wearable-battery.md` |
| 연구 상세 도식·사진 — 웨어러블 배터리 연구 이미지 1 | `public/images/research/wearable-battery/01.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/wearable-battery.md` |
| 연구 상세 도식·사진 — 웨어러블 배터리 연구 이미지 2 | `public/images/research/wearable-battery/02.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/wearable-battery.md` |
| 연구 상세 도식·사진 — 웨어러블 배터리 연구 이미지 3 | `public/images/research/wearable-battery/03.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/wearable-battery.md` |
| 연구 상세 도식·사진 — 웨어러블 배터리 연구 이미지 4 | `public/images/research/wearable-battery/04.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/wearable-battery.md` |
| 연구 상세 도식·사진 — 웨어러블 배터리 연구 이미지 5 | `public/images/research/wearable-battery/05.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/wearable-battery.md` |
| 연구 상세 도식·사진 — 웨어러블 배터리 연구 이미지 6 | `public/images/research/wearable-battery/06.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/wearable-battery.md` |
| 연구 상세 도식·사진 — 웨어러블 배터리 연구 이미지 7 | `public/images/research/wearable-battery/07.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/wearable-battery.md` |
| 연구 상세 도식·사진 — 웨어러블 배터리 연구 이미지 8 | `public/images/research/wearable-battery/08.jpg` | 비율 무관 (전체 표시) | 긴 변 1600~2000px | 같은 이름으로 업로드 · `src/content/research/wearable-battery.md` |

> 갤러리 참고: 원본 Wix 갤러리의 슬라이드 번호는 "2026 워크샵 in 속초" **8장**, "2025 한국전기화학회 in 제주도" **4장**으로 표시되었지만, 페이지에서 확인된 사진은 각각 3장입니다. 나머지 사진이 있으면 `gallery.json`에 `04.jpg`, `05.jpg` … 항목을 추가하세요.
