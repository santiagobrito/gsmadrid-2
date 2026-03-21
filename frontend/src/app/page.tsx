import { Hero } from '@/components/sections/Hero';
import { QuickAccess } from '@/components/sections/QuickAccess';
import { CalendarWidget } from '@/components/sections/CalendarWidget';
import { NewsGrid } from '@/components/sections/NewsGrid';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
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

      {/* Interactive calendar */}
      <section className="py-24">
        <Container>
          <SectionHeading
            badge="Agenda"
            title="Calendario de formacion"
            subtitle="Haz click en un dia con evento para ver la informacion y enlace de inscripcion."
          />
          <CalendarWidget />
        </Container>
      </section>

      <NewsGrid />
    </>
  );
}
