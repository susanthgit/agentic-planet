import { useEffect, useMemo, useState } from 'react';
import './CompareMatrix.css';

interface AxisValue {
  value: string | string[];
  note?: string;
  lastCheckedAt?: string;
  confidence?: 'high' | 'medium' | 'low';
  source?: string;
}

interface Item {
  id: string;
  name: string;
  entityType: string;
  layer?: string;
  primaryJob?: string;
  comparableWith?: string[];
  axes: Record<string, AxisValue | string | string[]>;
}

export interface Props {
  items: Item[];
  category: string;
  categoryLabel: string;
  defaultIds?: string[]; // initial selection
}

// Get the axis order from the first item; preserves the data file's ordering
function axisKeysFromItems(items: Item[]): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const it of items) {
    for (const k of Object.keys(it.axes ?? {})) {
      if (!seen.has(k)) { seen.add(k); order.push(k); }
    }
  }
  return order;
}

function humanizeAxisKey(k: string): string {
  // camelCase → Camel Case
  const spaced = k.replace(/([A-Z])/g, ' $1').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function readQueryItems(category: string): string[] {
  if (typeof window === 'undefined') return [];
  const url = new URL(window.location.href);
  const v = url.searchParams.get('items');
  return v ? v.split(',').map(s => s.trim()).filter(Boolean) : [];
}

function writeQueryItems(category: string, ids: string[]) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (ids.length === 0) url.searchParams.delete('items');
  else url.searchParams.set('items', ids.join(','));
  window.history.replaceState({}, '', url.toString());
}

function isAxisValue(v: unknown): v is AxisValue {
  return !!v && typeof v === 'object' && !Array.isArray(v) && 'value' in (v as object);
}

function isStale(lastCheckedAt?: string): boolean {
  if (!lastCheckedAt) return false;
  const checked = new Date(lastCheckedAt).getTime();
  if (Number.isNaN(checked)) return false;
  const ageDays = (Date.now() - checked) / (1000 * 60 * 60 * 24);
  return ageDays > 120;
}

function renderValue(v: AxisValue | string | string[]): { display: React.ReactNode; meta?: string; note?: string; stale?: boolean } {
  if (typeof v === 'string') return { display: v };
  if (Array.isArray(v)) return { display: <ul className="cmp-list">{v.map((x, i) => <li key={i}>{x}</li>)}</ul> };
  if (isAxisValue(v)) {
    const display = Array.isArray(v.value)
      ? <ul className="cmp-list">{v.value.map((x, i) => <li key={i}>{x}</li>)}</ul>
      : <span>{v.value}</span>;
    const metaParts: string[] = [];
    if (v.lastCheckedAt) metaParts.push(`checked ${v.lastCheckedAt}`);
    if (v.confidence)    metaParts.push(`${v.confidence} confidence`);
    return { display, meta: metaParts.join(' · '), note: v.note, stale: isStale(v.lastCheckedAt) };
  }
  return { display: '—' };
}

export default function CompareMatrix({ items, category, categoryLabel, defaultIds }: Props) {
  const allIds = useMemo(() => items.map(i => i.id), [items]);
  const sensibleDefault = useMemo(() => (defaultIds && defaultIds.length > 0
    ? defaultIds
    : allIds.slice(0, Math.min(2, allIds.length))), [defaultIds, allIds]);

  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const fromQuery = typeof window !== 'undefined' ? readQueryItems(category) : [];
    const filtered = fromQuery.filter(id => allIds.includes(id));
    return filtered.length > 0 ? filtered : sensibleDefault;
  });

  // Sync URL
  useEffect(() => {
    writeQueryItems(category, selectedIds);
  }, [selectedIds, category]);

  const toggle = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedItems = items.filter(i => selectedIds.includes(i.id));
  const axes = axisKeysFromItems(selectedItems);

  const reset = () => setSelectedIds(sensibleDefault);
  const selectAll = () => setSelectedIds(allIds);

  return (
    <div className="cmp">
      <div className="cmp__pickers">
        <div className="cmp__pickers-head">
          <span className="cmp__pickers-label mono">▸ PICK ITEMS // {categoryLabel.toUpperCase()}</span>
          <div className="cmp__pickers-actions">
            <button type="button" className="cmp__btn mono" onClick={reset}>RESET</button>
            <button type="button" className="cmp__btn mono" onClick={selectAll}>SELECT ALL</button>
          </div>
        </div>
        <div className="cmp__pickers-grid">
          {items.map(it => {
            const selected = selectedIds.includes(it.id);
            return (
              <button
                type="button"
                key={it.id}
                className={`cmp__chip ${selected ? 'cmp__chip--on' : ''}`}
                onClick={() => toggle(it.id)}
                aria-pressed={selected}
              >
                <span className="cmp__chip-name">{it.name}</span>
                {it.primaryJob && <span className="cmp__chip-job mono">{it.primaryJob}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {selectedItems.length === 0 && (
        <p className="cmp__empty mono">Pick at least one item above.</p>
      )}

      {selectedItems.length > 0 && (
        <div className="cmp__matrix-wrap">
          <table className="cmp__matrix">
            <thead>
              <tr>
                <th className="cmp__matrix-axis-head mono">// AXIS</th>
                {selectedItems.map(it => (
                  <th key={it.id} className="cmp__matrix-item-head">
                    <span className="cmp__name">{it.name}</span>
                    {it.primaryJob && <span className="cmp__matrix-item-job mono">{it.primaryJob}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {axes.map(k => {
                const allEmpty = selectedItems.every(it => it.axes?.[k] === undefined);
                if (allEmpty) return null;
                return (
                  <tr key={k}>
                    <th className="cmp__matrix-axis mono">{humanizeAxisKey(k)}</th>
                    {selectedItems.map(it => {
                      const raw = it.axes?.[k];
                      if (raw === undefined) return <td key={it.id} className="cmp__cell cmp__cell--empty">—</td>;
                      const r = renderValue(raw as AxisValue | string | string[]);
                      return (
                        <td key={it.id} className="cmp__cell">
                          <div className="cmp__cell-value">
                            {r.display}
                            {r.stale && <span className="cmp__stale mono" title="Data older than 120 days — may be out of date">STALE</span>}
                          </div>
                          {r.note && <p className="cmp__cell-note">{r.note}</p>}
                          {r.meta && <span className="cmp__cell-meta mono">{r.meta}</span>}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="cmp__share mono">
        Share this comparison: copy the URL — your selection is preserved.
      </p>
    </div>
  );
}
