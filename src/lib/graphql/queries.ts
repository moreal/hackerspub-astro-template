import { gql } from "graphql-request";

export const GET_ACTOR_WITH_ARTICLES = gql`
  query GetActorWithArticles($handle: String!, $after: String) {
    actorByHandle(handle: $handle, allowLocalHandle: true) {
      id
      handle
      name
      bio
      avatarUrl
      articles(first: 100, after: $after) {
        edges {
          cursor
          node {
            id
            name
            slug
            publishedYear
            published
            content
            visibility
            tags
            contents(includeBeingTranslated: false) {
              id
              language
              originalLanguage
              title
              content
              beingTranslated
              published
              updated
            }
            reactionGroups {
              __typename
              ... on EmojiReactionGroup {
                emoji
                reactors {
                  totalCount
                  edges {
                    node {
                      __typename
                    }
                  }
                }
              }
              ... on CustomEmojiReactionGroup {
                customEmoji {
                  name
                  iri
                }
                reactors {
                  totalCount
                  edges {
                    node {
                      __typename
                    }
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
