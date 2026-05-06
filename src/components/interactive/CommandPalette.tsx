import { useEffect, useMemo, useRef, useState } from 'react';
import { SEARCH_INDEX, CATEGORY_LABELS, CATEGORY_ORDER, type SearchEntry } from '../../data/search-index';
import './CommandPalette.css';

const RECENT_KEY = 'ap_recent_pages';
const MAX_RECENT = 4;

function getRecent(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

function rememberRecent(url: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getRecent();
    const next = [url, ...current.filter((u) => u !== url)].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

/** Fuzzy match: every char of needle appears in haystack in order. */
function fuzzyMatch(needle: string, haystack: string): { score: number; matched: boolean } {
  if (!needle) return { score: 0, matched: true };
  const n = needle.toLowerCase();
  const h = haystack.toLowerCase();
  // Direct substring is best
  const idx = h.indexOf(n);
  if (idx !== -1) {
    return { score: 1000 - idx * 2 - h.length, matched: true };
  }
  // Otherwise check fuzzy in-order
  let hi = 0;
  let score = 0;
  let lastIdx = -1;
  for (const ch of n) {
    const found = h.indexOf(ch, hi);
    if (found === -1) return { score: 0, matched: false };
    score += found - lastIdx === 1 ? 5 : 1;
    lastIdx = found;
    hi = found + 1;
  }
  return { score, matched: true };
}

function searchEntries(query: string, entries: SearchEntry[]): SearchEntry[] {
  if (!query.trim()) return entries;
  const scored: Array<{ entry: SearchEntry; score: number }> = [];
  for (const entry of entries) {
    const titleMatch = fuzzyMatch(query, entry.title);
    const descMatch = entry.description ? fuzzyMatch(query, entry.description) : { score: 0, matched: false };
    const kickerMatch = entry.kicker ? fuzzyMatch(query, entry.kicker) : { score: 0, matched: false };
    const score = (titleMatch.matched ? titleMatch.score * 2 : 0) +
                  (descMatch.matched ? descMatch.score : 0) +
                  (kickerMatch.matched ? kickerMatch.score : 0);
    if (score > 0) scored.push({ entry, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.entry);
}

interface Props {
  initiallyOpen?: boolean;
}

export default function CommandPalette({ initiallyOpen = false }: Props) {
  const [open, setOpen] = useState(initiallyOpen);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open on Cmd/Ctrl+K, close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const inField = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (open && e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      // forward-slash to open (when not typing in a field)
      if (!open && !inField && e.key === '/') {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Focus input + load recent on open
  useEffect(() => {
    if (open) {
      setRecent(getRecent());
      setQuery('');
      setActiveIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const recentEntries = useMemo(
    () => recent.map((url) => SEARCH_INDEX.find((e) => e.url === url)).filter(Boolean) as SearchEntry[],
    [recent]
  );

  const groups = useMemo(() => {
    const filtered = searchEntries(query, SEARCH_INDEX);
    const byCat: Record<string, SearchEntry[]> = {};
    for (const cat of CATEGORY_ORDER) byCat[cat] = [];
    for (const entry of filtered) {
      (byCat[entry.category] ??= []).push(entry);
    }
    const orderedGroups: Array<{ key: string; label: string; entries: SearchEntry[] }> = [];
    if (!query.trim() && recentEntries.length > 0) {
      orderedGroups.push({ key: 'recent', label: 'RECENTLY VIEWED', entries: recentEntries });
    }
    for (const cat of CATEGORY_ORDER) {
      if (byCat[cat]?.length) {
        orderedGroups.push({ key: cat, label: CATEGORY_LABELS[cat as SearchEntry['category']], entries: byCat[cat] });
      }
    }
    return orderedGroups;
  }, [query, recentEntries]);

  // Flat list of entries in display order, for keyboard nav
  const flatEntries = useMemo(() => groups.flatMap((g) => g.entries), [groups]);
  const activeEntry = flatEntries[activeIdx];

  useEffect(() => {
    if (activeIdx >= flatEntries.length) setActiveIdx(0);
  }, [flatEntries.length, activeIdx]);

  function handleNavigate(entry: SearchEntry) {
    rememberRecent(entry.url);
    setOpen(false);
    if (entry.url.startsWith('http')) {
      window.open(entry.url, '_blank', 'noopener');
    } else {
      window.location.href = entry.url;
    }
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, flatEntries.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeEntry) {
      e.preventDefault();
      handleNavigate(activeEntry);
    }
  }

  if (!open) return null;

  return (
    <div className="cmdk" role="dialog" aria-label="Command palette" aria-modal="true">
      <div className="cmdk__backdrop" onClick={() => setOpen(false)} />
      <div className="cmdk__panel">
        <div className="cmdk__bar">
          <span className="cmdk__sigil mono">⌘K</span>
          <input
            ref={inputRef}
            className="cmdk__input"
            type="search"
            placeholder="Search the planet… (pages, MCPs, recipes, FAQ)"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={onInputKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className="cmdk__esc mono">ESC</kbd>
        </div>

        <div className="cmdk__results">
          {groups.length === 0 && (
            <div className="cmdk__empty mono">NO MATCHES · TRY A DIFFERENT TERM</div>
          )}
          {groups.map((g) => (
            <div className="cmdk__group" key={g.key}>
              <div className="cmdk__group-label mono">// {g.label}</div>
              {g.entries.map((entry) => {
                const idx = flatEntries.indexOf(entry);
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={entry.url}
                    className={`cmdk__item ${isActive ? 'cmdk__item--active' : ''}`}
                    onClick={() => handleNavigate(entry)}
                    onMouseEnter={() => setActiveIdx(idx)}
                  >
                    {entry.kicker && <span className="cmdk__kicker mono">{entry.kicker}</span>}
                    <span className="cmdk__main">
                      <span className="cmdk__title">{entry.title}</span>
                      {entry.description && <span className="cmdk__desc">{entry.description}</span>}
                    </span>
                    {entry.shortcut && <kbd className="cmdk__shortcut mono">{entry.shortcut}</kbd>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="cmdk__foot mono">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>ESC</kbd> close</span>
          <span className="cmdk__brand">{flatEntries.length} entries · agentic.planet</span>
        </div>
      </div>
    </div>
  );
}
