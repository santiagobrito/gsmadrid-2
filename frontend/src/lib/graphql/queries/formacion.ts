import { gql } from 'graphql-request';

export const FORMACION_FIELDS = gql`
  fragment FormacionFields on Formacion {
    id
    databaseId
    slug
    title
    date
    modified
    uri
    excerpt
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
    modalidades {
      nodes {
        name
        slug
      }
    }
    formacionFields {
      fechaInicio
      fechaFin
      horario
      horasLectivas
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
      lugar
      plazas
      tipoAcceso
      esGratuito
      precios {
        concepto
        importe
        nota
      }
      programa
      urlInscripcion
      estado
    }
  }
`;

export const GET_FORMACIONES = gql`
  ${FORMACION_FIELDS}
  query GetFormaciones($first: Int = 12, $after: String) {
    formaciones(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...FormacionFields
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_FORMACION_BY_SLUG = gql`
  ${FORMACION_FIELDS}
  query GetFormacionBySlug($slug: ID!) {
    formacion(id: $slug, idType: SLUG) {
      ...FormacionFields
      content
    }
  }
`;

export const GET_FORMACION_SLUGS = gql`
  query GetFormacionSlugs($first: Int = 100) {
    formaciones(first: $first) {
      nodes {
        slug
      }
    }
  }
`;
