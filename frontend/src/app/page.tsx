import { Hero } from '@/components/sections/Hero';
import { QuickAccess } from '@/components/sections/QuickAccess';
import { UpcomingEvents, UpcomingItem } from '@/components/sections/UpcomingEvents';
import { CalendarWidget } from '@/components/sections/CalendarWidget';
import { NewsGrid } from '@/components/sections/NewsGrid';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { organizationSchema } from '@/lib/seo/schema';
import { fetchGraphQL } from '@/lib/graphql/client';

export const revalidate = 60;

const POSTS_QUERY = `{
  posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
    nodes { title slug date excerpt featuredImage { node { sourceUrl } } categories { nodes { name } } }
  }
}`;

const FORMACIONES_QUERY = `{
  formaciones(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      title slug
      featuredImage { node { sourceUrl } }
      formacionFields { fechaInicio horario lugar estado }
    }
  }
}`;

const EVENTOS_QUERY = `{
  eventos(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      title slug
      featuredImage { node { sourceUrl } }
      eventoFields { fechaInicio horario lugar tipoEvento estado soloColegiados }
    }
  }
}`;

interface WpPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  categories: { nodes: { name: string }[] };
}

interface WpFormacion {
  slug: string;
  title: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  formacionFields: {
    fechaInicio: string | null;
    horario: string | null;
    lugar: string | null;
    estado: string | null;
  };
}

interface WpEvento {
  slug: string;
  title: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  eventoFields: {
    fechaInicio: string | null;
    horario: string | null;
    lugar: string | null;
    tipoEvento: string | string[] | null;
    estado: string | string[] | null;
    soloColegiados: boolean | null;
  };
}

interface PostsResponse { posts: { nodes: WpPost[] } }
interface FormacionesResponse { formaciones: { nodes: WpFormacion[] } }
interface EventosResponse { eventos: { nodes: WpEvento[] } }

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

function extractSelect(val: string | string[] | null): string {
  if (!val) return '';
  return Array.isArray(val) ? val[0] : val;
}

export default async function HomePage() {
  // Fetch all data in parallel
  const [postData, formData, eventoData] = await Promise.all([
    fetchGraphQL<PostsResponse>(POSTS_QUERY).catch(() => null),
    fetchGraphQL<FormacionesResponse>(FORMACIONES_QUERY).catch(() => null),
    fetchGraphQL<EventosResponse>(EVENTOS_QUERY).catch(() => null),
  ]);

  // Posts for NewsGrid
  const posts = postData?.posts?.nodes?.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt?.replace(/<[^>]*>/g, '').trim() || '',
    date: formatDate(p.date),
    category: p.categories?.nodes?.[0]?.name || 'Noticia',
    imageUrl: p.featuredImage?.node?.sourceUrl,
  })) || [];

  // Formaciones for calendar + upcoming
  const formaciones = formData?.formaciones?.nodes || [];
  const calendarFormaciones = formaciones.map((f) => ({
    date: f.formacionFields?.fechaInicio?.split('T')[0] || '',
    title: f.title,
    time: f.formacionFields?.horario || '',
    location: f.formacionFields?.lugar || '',
    href: `/formacion-eventos/${f.slug}`,
    type: 'formacion' as const,
  }));

  // Eventos for calendar + upcoming
  const eventos = eventoData?.eventos?.nodes || [];
  const calendarEventos = eventos.map((e) => ({
    date: e.eventoFields?.fechaInicio?.split('T')[0] || '',
    title: e.title,
    time: e.eventoFields?.horario || '',
    location: e.eventoFields?.lugar || '',
    href: `/eventos/${e.slug}`,
    type: 'evento' as const,
  }));

  // Combined calendar events (formaciones + eventos)
  const calendarEvents = [...calendarFormaciones, ...calendarEventos];

  // Upcoming items (formaciones + eventos, with sticky support)
  const upcomingItems: UpcomingItem[] = [
    ...formaciones.map((f): UpcomingItem => ({
      slug: f.slug,
      title: f.title,
      date: f.formacionFields?.fechaInicio || '',
      dateDisplay: f.formacionFields?.fechaInicio ? formatDate(f.formacionFields.fechaInicio) : '',
      time: f.formacionFields?.horario || '',
      location: f.formacionFields?.lugar || '',
      type: 'formacion',
      href: `/formacion-eventos/${f.slug}`,
      imageUrl: f.featuredImage?.node?.sourceUrl,
      sticky: false,
    })),
    ...eventos.map((e): UpcomingItem => {
      const tipo = extractSelect(e.eventoFields?.tipoEvento);
      return {
        slug: e.slug,
        title: e.title,
        date: e.eventoFields?.fechaInicio || '',
        dateDisplay: e.eventoFields?.fechaInicio ? formatDate(e.eventoFields.fechaInicio) : '',
        time: e.eventoFields?.horario || '',
        location: e.eventoFields?.lugar || '',
        type: 'evento',
        href: `/eventos/${e.slug}`,
        imageUrl: e.featuredImage?.node?.sourceUrl,
        soloColegiados: e.eventoFields?.soloColegiados || false,
        tipoEvento: tipo ? tipo.charAt(0).toUpperCase() + tipo.slice(1).replace(/_/g, ' ') : undefined,
        sticky: false,
      };
    }),
  ];

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

      {/* Upcoming events — formaciones + eventos combined */}
      <UpcomingEvents items={upcomingItems} />

      {/* Interactive calendar — also combines both CPTs */}
      <section className="py-24">
        <Container>
          <SectionHeading
            badge="Agenda"
            title="Calendario"
            subtitle="Haz click en un dia con evento para ver la informacion y enlace de inscripcion."
          />
          <CalendarWidget events={calendarEvents} />
        </Container>
      </section>

      <NewsGrid posts={posts} />
    </>
  );
}
