/**
 * 내부 링크·이미지·파일 경로 앞에 배포 경로(base)를 붙여 줍니다.
 * 예) url('/members/')  →  '/members/'  또는  '/저장소명/members/'
 * 외부 주소(https:, mailto:, tel:)와 '#앵커'는 그대로 둡니다.
 */
export function url(path: string = '/'): string {
  if (!path) return path;
  if (/^(https?:|mailto:|tel:|#|data:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  const b = base.endsWith('/') ? base : base + '/';
  return b + path.replace(/^\/+/, '');
}

/** 현재 페이지 경로에서 base를 제거해 '/members/' 같은 형태로 돌려줍니다. */
export function stripBase(pathname: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  let p = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  if (!p.startsWith('/')) p = '/' + p;
  if (!p.endsWith('/')) p += '/';
  return p;
}
