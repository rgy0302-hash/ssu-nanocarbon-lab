/**
 * Markdown 콘텐츠(연구 분야, 공지사항)를 읽어 옵니다.
 * - src/content/research/*.md  → 연구 분야
 * - src/content/notices/*.md   → 공지사항 (파일명이 _ 로 시작하거나 draft: true 이면 제외)
 */
export interface ImageItem { src: string; alt: string; caption?: string; fit?: 'cover' | 'contain'; focus?: string }

export interface ResearchEntry {
  slug: string;
  order: number;
  title: string;
  titleKo: string;
  overviewLabel?: string;
  summary: string;
  cover?: ImageItem;
  images: ImageItem[];
  Content: any;
}

export interface NoticeEntry {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  pinned?: boolean;
  attachments?: { label: string; file: string }[];
  Content: any;
}

const slugOf = (file: string) => file.split('/').pop()!.replace(/\.md$/, '');

export function getResearch(): ResearchEntry[] {
  const mods = import.meta.glob('/src/content/research/*.md', { eager: true }) as Record<string, any>;
  return Object.entries(mods)
    .map(([file, m]) => ({ slug: slugOf(file), images: [], ...m.frontmatter, Content: m.Content }))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

function toDateString(d: unknown): string {
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return d ? String(d) : '';
}

export function getNotices(): NoticeEntry[] {
  const mods = import.meta.glob('/src/content/notices/*.md', { eager: true }) as Record<string, any>;
  return Object.entries(mods)
    .filter(([file, m]) => !slugOf(file).startsWith('_') && !m.frontmatter?.draft)
    .map(([file, m]) => ({ slug: slugOf(file), ...m.frontmatter, date: toDateString(m.frontmatter?.date), Content: m.Content }))
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.date.localeCompare(a.date));
}

export function formatDate(d: string): string {
  return d ? d.replace(/-/g, '.') : '';
}
