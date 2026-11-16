/**
 * 목록 검색·필터 (논문, 특허, 졸업생 공용)
 * - [data-q]      검색어 입력
 * - [data-year]   그룹(연도) 선택
 * - [data-seg]    구분 버튼 (예: 국내/해외) — data-value 와 항목의 data-seg-value 비교
 * - [data-item]   항목 (data-text 에 검색 대상 문자열)
 * - [data-group]  묶음(연도별 섹션)
 * JavaScript가 꺼져 있어도 전체 목록은 그대로 보입니다.
 */
export function setupFilter(opts: { unit?: string } = {}) {
  const unit = opts.unit ?? '건';
  const q = document.querySelector<HTMLInputElement>('[data-q]');
  const year = document.querySelector<HTMLSelectElement>('[data-year]');
  const reset = document.querySelector<HTMLButtonElement>('[data-reset]');
  const count = document.querySelector<HTMLElement>('[data-count]');
  const empty = document.querySelector<HTMLElement>('[data-empty]');
  const segs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-seg]'));
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-group]'));
  const total = document.querySelectorAll('[data-item]').length;
  let seg = '';

  // 주소창의 ?q=검색어&year=2024 를 읽어 초기 상태로 사용
  const params = new URLSearchParams(location.search);
  if (q && params.get('q')) q.value = params.get('q')!;
  if (year && params.get('year')) year.value = params.get('year')!;

  function apply() {
    const terms = (q?.value || '').toLowerCase().trim().split(/\s+/).filter(Boolean);
    const y = year?.value || '';
    let shown = 0;
    for (const g of groups) {
      let inGroup = 0;
      const groupOk = !y || g.dataset.group === y;
      g.querySelectorAll<HTMLElement>('[data-item]').forEach((it) => {
        const text = it.dataset.text || '';
        const ok = groupOk && (!seg || it.dataset.segValue === seg) && terms.every((t) => text.includes(t));
        it.hidden = !ok;
        if (ok) inGroup++;
      });
      g.hidden = inGroup === 0;
      const c = g.querySelector<HTMLElement>('[data-group-count]');
      if (c) c.textContent = `${inGroup}${unit}`;
      shown += inGroup;
    }
    if (count) count.textContent = shown === total ? `총 ${total}${unit}` : `총 ${total}${unit} 중 ${shown}${unit} 표시`;
    if (empty) empty.hidden = shown !== 0;
  }
  q?.addEventListener('input', apply);
  year?.addEventListener('change', apply);
  segs.forEach((b) =>
    b.addEventListener('click', () => {
      seg = b.dataset.value || '';
      segs.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      apply();
    }),
  );
  reset?.addEventListener('click', () => {
    if (q) q.value = '';
    if (year) year.value = '';
    seg = '';
    segs.forEach((x, i) => x.setAttribute('aria-pressed', String(i === 0)));
    apply();
    q?.focus();
  });
  apply();
}
