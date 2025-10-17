import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql";
import type { GetActorWithArticlesQuery } from "./generated/graphql";
import { siteConfig } from "../../../site.config";

const client = new GraphQLClient(siteConfig.graphqlEndpoint);
const sdk = getSdk(client);

export type Article = NonNullable<
  NonNullable<
    GetActorWithArticlesQuery["actorByHandle"]
  >["articles"]["edges"][number]["node"]
>;

export type Actor = NonNullable<GetActorWithArticlesQuery["actorByHandle"]>;

const VISIBILITY_LEVELS = {
  NONE: 0,
  DIRECT: 1,
  FOLLOWERS: 2,
  UNLISTED: 3,
  PUBLIC: 4,
} as const;

type Visibility = keyof typeof VISIBILITY_LEVELS;

function isVisibilityAtLeast(
  articleVisibility: string,
  minimumVisibility: Visibility,
): boolean {
  const articleLevel = VISIBILITY_LEVELS[articleVisibility as Visibility] ?? 0;
  const minimumLevel = VISIBILITY_LEVELS[minimumVisibility];
  return articleLevel >= minimumLevel;
}

export async function getAllArticles(
  handle: string,
  minimumVisibility: Visibility = "PUBLIC",
): Promise<Article[]> {
  const articles: Article[] = [];
  let cursor: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await sdk.GetActorWithArticles({
      handle,
      after: cursor,
    });

    if (!response.data.actorByHandle) {
      throw new Error(`Actor not found: ${handle}`);
    }

    const edges = response.data.actorByHandle.articles.edges;

    for (const edge of edges) {
      if (isVisibilityAtLeast(edge.node.visibility, minimumVisibility)) {
        articles.push(edge.node);
      }
    }

    hasNextPage = response.data.actorByHandle.articles.pageInfo.hasNextPage;
    cursor = response.data.actorByHandle.articles.pageInfo.endCursor ?? null;
  }

  return articles.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime(),
  );
}

export async function getActor(handle: string): Promise<Actor> {
  const response = await sdk.GetActorWithArticles({ handle });

  if (!response.data.actorByHandle) {
    throw new Error(`Actor not found: ${handle}`);
  }

  return response.data.actorByHandle;
}
