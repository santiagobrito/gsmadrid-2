import { gql } from 'graphql-request';

export const EVENTO_FIELDS = gql`
  fragment EventoFields on Evento {
    id
    databaseId
    slug
    title
    date
    modified
    uri
    excerpt
    content
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    eventoFields {
      fechaInicio
      fechaFin
      horario
      lugar
      tipoEvento
      estado
      plazas
      requiereInscripcion
      urlInscripcion
      organizador
      programa
      documento {
        node {
          mediaItemUrl
          title
        }
      }
      soloColegiados
      ponentes {
        nombre
        cargo
        bio
        foto {
          node {
            sourceUrl
          }
        }
        linkedin
      }
    }
  }
`;

export const GET_EVENTO_BY_SLUG = gql`
  ${EVENTO_FIELDS}
  query GetEventoBySlug($slug: ID!) {
    evento(id: $slug, idType: SLUG) {
      ...EventoFields
    }
  }
`;

export const GET_EVENTO_SLUGS = gql`
  query GetEventoSlugs($first: Int = 100) {
    eventos(first: $first) {
      nodes {
        slug
      }
    }
  }
`;
