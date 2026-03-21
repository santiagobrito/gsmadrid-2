import { Hero } from '@/components/sections/Hero';
import { QuickAccess } from '@/components/sections/QuickAccess';
import { CalendarPreview } from '@/components/sections/CalendarPreview';
import { NewsGrid } from '@/components/sections/NewsGrid';
import { organizationSchema } from '@/lib/seo/schema';

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      />
      <Hero />
      <QuickAccess />
      <CalendarPreview />
      <NewsGrid />
    </>
  );
}
