import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
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
      <nav aria-label="Breadcrumb" className="border-b border-border bg-bg-alt">
        <Container className="py-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-tertiary">
            {allItems.map((item, index) => {
              const isLast = index === allItems.length - 1;
              return (
                <li key={item.href} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight size={14} strokeWidth={1.5} className="text-border" />
                  )}
                  {isLast ? (
                    <span className="font-medium text-text">{item.label}</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      </nav>
    </>
  );
}
