import { GraphQLClient } from 'graphql-request';

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;

export const graphqlClient = new GraphQLClient(GRAPHQL_URL);

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  return graphqlClient.request<T>(query, variables);
}
