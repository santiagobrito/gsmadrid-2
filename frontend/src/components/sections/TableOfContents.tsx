'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractHeadings(html: string): TocItem[] {
  const regex = /<h([2-4])[^>]*>(.*?)<\/h[2-4]>/gi;
  const items: TocItem[] = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    if (text) {
      items.push({
        id: generateId(text),
        text,
        level: parseInt(match[1], 10),
      });
    }
  }

  return items;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const headings = extractHeadings(content);

  useEffect(() => {
    // Add IDs to headings in the DOM
    const proseEl = document.querySelector('.prose');
    if (!proseEl) return;

    const domHeadings = proseEl.querySelectorAll('h2, h3, h4');
    domHeadings.forEach((el) => {
      const text = (el.textContent || '').trim();
      const id = generateId(text);
      if (!el.id) el.id = id;
    });

    // Intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    domHeadings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content]);

  if (headings.length < 2) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
        <List size={14} strokeWidth={1.5} />
        Contenido
      </h4>
      <nav>
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.id}>
              <button
                onClick={() => handleClick(h.id)}
                className={`block w-full text-left text-sm transition-colors ${
                  h.level === 3 ? 'pl-3' : h.level === 4 ? 'pl-6' : ''
                } ${
                  activeId === h.id
                    ? 'font-medium text-primary'
                    : 'font-light text-text-secondary hover:text-primary'
                }`}
                style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
