import { gql } from 'graphql-request';

export const POST_FIELDS = gql`
  fragment PostFields on Post {
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
    postExtraFields {
      subtitulo
      documentoAdjunto {
        node {
          mediaItemUrl
          title
        }
      }
      fuenteExterna
      esDestacada
    }
    categories {
      nodes {
        id
        name
        slug
      }
    }
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  ${POST_FIELDS}
  query GetPosts($first: Int = 12, $after: String, $categorySlug: String) {
    posts(
      first: $first
      after: $after
      where: {
        orderby: { field: DATE, order: DESC }
        categoryName: $categorySlug
      }
    ) {
      nodes {
        ...PostFields
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

export const GET_POST_BY_SLUG = gql`
  ${POST_FIELDS}
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFields
      content
    }
  }
`;

export const GET_POST_SLUGS = gql`
  query GetPostSlugs($first: Int = 100) {
    posts(first: $first) {
      nodes {
        slug
      }
    }
  }
`;
