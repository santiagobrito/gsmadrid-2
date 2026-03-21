import { gql } from 'graphql-request';

export const PROFESIONAL_FIELDS = gql`
  fragment ProfesionalFields on Profesional {
    id
    databaseId
    slug
    title
    date
    modified
    uri
    profesionalFields {
      numeroColegiado
      nombreCompleto
      foto {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      despacho
      direccion
      codigoPostal
      telefono
      email
      web
      linkedin
      bio
      ejerciente
      idiomas
      aceptaTurnoOficio
      mediadorRegistrado
      visibleDirectorio
    }
  }
`;

export const GET_PROFESIONALES = gql`
  ${PROFESIONAL_FIELDS}
  query GetProfesionales($first: Int = 12, $after: String, $search: String) {
    profesionales(
      first: $first
      after: $after
      where: { search: $search, orderby: { field: TITLE, order: ASC } }
    ) {
      nodes {
        ...ProfesionalFields
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

export const GET_PROFESIONAL_BY_SLUG = gql`
  ${PROFESIONAL_FIELDS}
  query GetProfesionalBySlug($slug: ID!) {
    profesional(id: $slug, idType: SLUG) {
      ...ProfesionalFields
    }
  }
`;

export const GET_PROFESIONAL_SLUGS = gql`
  query GetProfesionalSlugs($first: Int = 100) {
    profesionales(first: $first) {
      nodes {
        slug
      }
    }
  }
`;
