import { gql } from 'graphql-request';

export const CURSO_FIELDS = gql`
  fragment CursoFields on Curso {
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
    cursoFields {
      fechaInicio
      fechaFin
      horario
      horasLectivas
      ponentes {
        nombre
        cargo
        bio
      }
      lugar
      plazas
      tipoAcceso
      esGratuito
      precios {
        tipo
        importe
        descripcion
      }
      programa
      urlInscripcion
      estado
      diploma {
        emiteDiploma
        entidadEmisora
        horasConvalidables
      }
      duracionTexto
      dirigidoA
      objetivos
      modulos
      profesorado
      certificacion
      colaboradores
    }
    categorias {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_CURSOS = gql`
  ${CURSO_FIELDS}
  query GetCursos($first: Int = 12, $after: String) {
    cursos(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...CursoFields
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

export const GET_CURSO_BY_SLUG = gql`
  ${CURSO_FIELDS}
  query GetCursoBySlug($slug: ID!) {
    curso(id: $slug, idType: SLUG) {
      ...CursoFields
      content
    }
  }
`;

export const GET_CURSO_SLUGS = gql`
  query GetCursoSlugs($first: Int = 100) {
    cursos(first: $first) {
      nodes {
        slug
      }
    }
  }
`;
