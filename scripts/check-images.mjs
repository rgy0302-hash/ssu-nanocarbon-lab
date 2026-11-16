// 사용법: npm run check:images
// 사이트 데이터에 적힌 모든 이미지 경로를 모아, public 폴더에 실제 파일이 있는지 보여 줍니다.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pub = path.join(root, 'public');
const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg', '.JPG', '.JPEG', '.PNG', '.WEBP'];
const found = new Map(); // src -> where

function collect(obj, where) {
  if (Array.isArray(obj)) obj.forEach((v) => collect(v, where));
  else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'src' && typeof v === 'string' && v.startsWith('/images/')) found.set(v, where);
      else collect(v, where);
    }
  }
}
for (const f of fs.readdirSync(path.join(root, 'src/data'))) {
  if (f.endsWith('.json')) collect(JSON.parse(fs.readFileSync(path.join(root, 'src/data', f), 'utf8')), `src/data/${f}`);
}
for (const dir of ['src/content/research', 'src/content/notices', 'src/content/pages']) {
  const d = path.join(root, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith('.md')) continue;
    const text = fs.readFileSync(path.join(d, f), 'utf8');
    for (const m of text.matchAll(/src:\s*["']?(\/images\/[^"',}\s]+)/g)) found.set(m[1], `${dir}/${f}`);
  }
}
function exists(src) {
  const rel = src.replace(/^\//, '');
  if (fs.existsSync(path.join(pub, rel))) return rel;
  const ext = path.extname(rel);
  const stem = ext ? rel.slice(0, -ext.length) : rel;
  for (const e of EXTS) if (fs.existsSync(path.join(pub, stem + e))) return stem + e;
  return null;
}
let ok = 0, missing = 0;
const rows = [...found.entries()].sort();
for (const [src, where] of rows) {
  const hit = exists(src);
  if (hit) ok++; else missing++;
  console.log(`${hit ? '✅ 있음 ' : '⬜ 없음 '} public${src}${hit && '/' + hit !== src ? `  (실제 파일: public/${hit})` : ''}   ← ${where}`);
}
console.log(`\n총 ${rows.length}개 중 ${ok}개 연결됨, ${missing}개는 '이미지 준비 중'으로 표시됩니다.`);
