// @ts-check
import { defineConfig } from 'astro/config';

/*
 * 사이트 주소 설정
 * ─────────────────────────────────────────────
 * GitHub Actions로 배포하면 아래 두 값이 "자동으로" 채워집니다.
 *   - https://사용자명.github.io/            → base = '/'
 *   - https://사용자명.github.io/저장소명/   → base = '/저장소명'
 * 직접 지정하고 싶을 때만 SITE_URL / BASE_PATH 환경변수를 바꾸세요.
 * (로컬에서 npm run dev 할 때는 기본값 '/'를 사용합니다.)
 */
const site = process.env.SITE_URL || 'https://example.github.io';
const base = process.env.BASE_PATH && process.env.BASE_PATH !== '' ? process.env.BASE_PATH : '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
