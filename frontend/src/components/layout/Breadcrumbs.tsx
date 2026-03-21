import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { breadcrumbSchema } from '@/lib/seo/schema';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Inicio', href: '/' }, ...items];
  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: item.href,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(schemaItems)),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-[#6B7280]">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight size={14} strokeWidth={1.5} className="text-[#E2E8F0]" />
                )}
                {isLast ? (
                  <span className="font-medium text-[#0F172A]">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#2563EB]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
