import fs from 'node:fs';
import path from 'node:path';

/**
 * 이미지가 public 폴더에 실제로 있는지 "빌드할 때" 확인합니다.
 * - 있으면 그 경로를 돌려주고, 없으면 null → 화면에는 '이미지 준비 중' 상자가 표시됩니다.
 * - 확장자가 달라도 찾아 줍니다. (데이터에 hero.jpg 라고 적혀 있어도 hero.png / hero.webp 를 올리면 인식)
 */
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg', '.JPG', '.JPEG', '.PNG', '.WEBP'];

export function resolveImage(src?: string | null): string | null {
  if (!src) return null;
  if (/^(https?:|data:)/i.test(src)) return src;
  const rel = src.replace(/^\/+/, '');
  if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return '/' + rel;
  const ext = path.extname(rel);
  const stem = ext ? rel.slice(0, -ext.length) : rel;
  for (const e of EXTS) {
    if (fs.existsSync(path.join(PUBLIC_DIR, stem + e))) return '/' + stem + e;
  }
  return null;
}
