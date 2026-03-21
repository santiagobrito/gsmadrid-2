import { gql } from 'graphql-request';

export const GET_MENU = gql`
  query GetMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }, first: 50) {
      nodes {
        id
        label
        url
        path
        parentId
        order
        cssClasses
      }
    }
  }
`;
