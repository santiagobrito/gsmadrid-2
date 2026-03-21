import { Hero } from '@/components/sections/Hero';
import { QuickAccess } from '@/components/sections/QuickAccess';
import { CalendarWidget } from '@/components/sections/CalendarWidget';
import { NewsGrid } from '@/components/sections/NewsGrid';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { organizationSchema } from '@/lib/seo/schema';
import { fetchGraphQL } from '@/lib/graphql/client';

export const revalidate = 60;

const POSTS_QUERY = `{
  posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
    nodes { title slug date excerpt categories { nodes { name } } }
  }
}`;

const FORMACIONES_QUERY = `{
  formaciones(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
    nodes { title slug formacionFields { fechaInicio horario lugar } }
  }
}`;

interface WpPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: { nodes: { name: string }[] };
}

interface WpFormacion {
  slug: string;
  title: string;
  formacionFields: {
    fechaInicio: string | null;
    horario: string | null;
    lugar: string | null;
  };
}

interface PostsResponse {
  posts: { nodes: WpPost[] };
}

interface FormacionesResponse {
  formaciones: { nodes: WpFormacion[] };
}

export default async function HomePage() {
  // Fetch blog posts for NewsGrid
  let posts: { slug: string; title: string; excerpt: string; date: string; category: string }[] = [];
  try {
    const postData = await fetchGraphQL<PostsResponse>(POSTS_QUERY);
    posts = postData.posts.nodes.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt?.replace(/<[^>]*>/g, '').trim() || '',
      date: new Date(p.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: p.categories?.nodes?.[0]?.name || 'Noticia',
    }));
  } catch {
    // Fallback to hardcoded data in NewsGrid
  }

  // Fetch formaciones for CalendarWidget
  let calendarEvents: { date: string; title: string; time: string; location: string; href: string }[] = [];
  try {
    const formData = await fetchGraphQL<FormacionesResponse>(FORMACIONES_QUERY);
    calendarEvents = formData.formaciones.nodes.map((f) => ({
      date: f.formacionFields?.fechaInicio?.split('T')[0] || '',
      title: f.title,
      time: f.formacionFields?.horario || '',
      location: f.formacionFields?.lugar || '',
      href: `/formacion-eventos/${f.slug}`,
    }));
  } catch {
    // Fallback to hardcoded data in CalendarWidget
  }

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
          <CalendarWidget events={calendarEvents} />
        </Container>
      </section>

      <NewsGrid posts={posts} />
    </>
  );
}
