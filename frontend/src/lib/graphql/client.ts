import { GraphQLClient } from 'graphql-request';

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const client = new GraphQLClient(GRAPHQL_URL, {
    signal: AbortSignal.timeout(10_000),
  });
  return client.request<T>(query, variables);
}
