import { gql } from 'graphql-request';

export const GET_MIEMBROS_JUNTA = gql`
  query GetMiembrosJunta {
    miembrosJunta(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        databaseId
        title
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
        miembroJuntaFields {
          cargo
          tipo
          orden
          mandato
          destacado
          bio
          cita
          email
          linkedin
        }
      }
    }
  }
`;
