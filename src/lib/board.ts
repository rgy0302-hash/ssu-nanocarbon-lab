/**
 * Board(공지·갤러리·동영상) 게시물을 한 목록으로 모읍니다.
 * 데이터 위치
 *   - 공지:   src/content/notices/*.md
 *   - 갤러리: src/data/gallery.json
 *   - 동영상: src/data/videos.json
 *
 * 정렬 규칙 (날짜를 지어내지 않습니다)
 *   1) 실제 날짜(date)가 있으면 그 날짜로 정렬합니다.
 *   2) 갤러리 앨범에 날짜가 없으면 앨범 id 앞의 연도(예: "2026-…")만 사용합니다.
 *      같은 연도 안에서는 날짜가 있는 항목이 먼저, 그다음은 파일에 적힌 순서(위쪽 먼저)입니다.
 *   3) 화면에는 실제로 입력된 날짜만 표시합니다.
 */
import gallery from '../data/gallery.json';
import videos from '../data/videos.json';
import { getNotices, formatDate } from './content';

export type BoardType = 'notice' | 'gallery' | 'video';

export interface BoardItem {
  type: BoardType;
  typeLabel: string;
  title: string;
  href: string;          // base 경로를 붙이기 전 주소 (url()로 감싸서 사용)
  date: string;          // 화면 표시용 (실제 입력된 날짜만, 없으면 '')
  datetime: string;      // <time datetime> 용 (YYYY-MM-DD, 없으면 '')
  sortKey: string;
  summary?: string;
  image?: { src: string; alt: string; focus?: string };
  external?: boolean;
  count?: number;
}

export const BOARD_LABELS: Record<BoardType, string> = { notice: 'Notice', gallery: 'Gallery', video: 'Videos' };

/** "2025.10.15", "2025-10-15", "2025/10/15" → "2025-10-15". 형식이 다르면 '' */
export function normalizeDate(d?: string | null): string {
  if (!d) return '';
  const m = String(d).trim().match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
  return m ? `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}` : '';
}

export function videoAnchor(id: string): string {
  return `v-${id}`;
}

export function getBoardItems(): BoardItem[] {
  const items: (BoardItem & { order: number })[] = [];
  let order = 0;

  for (const n of getNotices()) {
    items.push({
      type: 'notice', typeLabel: BOARD_LABELS.notice, title: n.title, href: `/notice/${n.slug}/`,
      date: formatDate(n.date), datetime: n.date, sortKey: n.date, summary: n.summary, order: order++,
    });
  }

  for (const a of gallery.albums as any[]) {
    const iso = normalizeDate(a.date);
    const year = (String(a.id).match(/^(\d{4})/) || [])[1] || '';
    const cover = a.photos?.[0];
    items.push({
      type: 'gallery', typeLabel: BOARD_LABELS.gallery, title: a.title, href: `/gallery/#${a.id}`,
      date: iso ? formatDate(iso) : '', datetime: iso, sortKey: iso || year, summary: a.description || '',
      image: cover ? { src: cover.src, alt: cover.alt || a.title, focus: cover.focus } : undefined,
      count: a.photos?.length || 0, order: order++,
    });
  }

  for (const v of videos.videos as any[]) {
    const iso = normalizeDate(v.date);
    items.push({
      type: 'video', typeLabel: BOARD_LABELS.video, title: v.title, href: `/videos/#${videoAnchor(v.youtubeId)}`,
      date: iso ? formatDate(iso) : '', datetime: iso, sortKey: iso, summary: v.description || '',
      image: { src: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`, alt: `${v.title} 동영상 썸네일` },
      order: order++,
    });
  }

  return items
    .sort((a, b) => b.sortKey.localeCompare(a.sortKey) || a.order - b.order)
    .map(({ order: _o, ...rest }) => rest);
}

export function getBoardCounts() {
  const albums = gallery.albums as any[];
  return {
    notice: getNotices().length,
    albums: albums.length,
    photos: albums.reduce((s, a) => s + (a.photos?.length || 0), 0),
    videos: (videos.videos as any[]).length,
  };
}
