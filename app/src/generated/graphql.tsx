import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Blog = {
  __typename?: 'Blog';
  date?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  pictures?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type BlogInput = {
  date?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertBlog: Blog;
};


export type MutationUpsertBlogArgs = {
  input: BlogInput;
};

export type Query = {
  __typename?: 'Query';
  blogs?: Maybe<Array<Maybe<Blog>>>;
  latestBlog?: Maybe<Blog>;
};

export type GetAllBlogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBlogsQuery = { __typename?: 'Query', blogs?: Array<{ __typename?: 'Blog', id?: string | null, title?: string | null, description?: string | null, date?: string | null, pictures?: Array<string | null> | null } | null> | null };

export type GetLatestBlogQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestBlogQuery = { __typename?: 'Query', latestBlog?: { __typename?: 'Blog', id?: string | null, title?: string | null, description?: string | null, date?: string | null, pictures?: Array<string | null> | null } | null };


export const GetAllBlogsDocument = gql`
    query GetAllBlogs {
  blogs {
    id
    title
    description
    date
    pictures
  }
}
    `;

/**
 * __useGetAllBlogsQuery__
 *
 * To run a query within a React component, call `useGetAllBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBlogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBlogsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBlogsQuery, GetAllBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBlogsQuery, GetAllBlogsQueryVariables>(GetAllBlogsDocument, options);
      }
export function useGetAllBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBlogsQuery, GetAllBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBlogsQuery, GetAllBlogsQueryVariables>(GetAllBlogsDocument, options);
        }
export type GetAllBlogsQueryHookResult = ReturnType<typeof useGetAllBlogsQuery>;
export type GetAllBlogsLazyQueryHookResult = ReturnType<typeof useGetAllBlogsLazyQuery>;
export type GetAllBlogsQueryResult = Apollo.QueryResult<GetAllBlogsQuery, GetAllBlogsQueryVariables>;
export const GetLatestBlogDocument = gql`
    query GetLatestBlog {
  latestBlog {
    id
    title
    description
    date
    pictures
  }
}
    `;

/**
 * __useGetLatestBlogQuery__
 *
 * To run a query within a React component, call `useGetLatestBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestBlogQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLatestBlogQuery(baseOptions?: Apollo.QueryHookOptions<GetLatestBlogQuery, GetLatestBlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLatestBlogQuery, GetLatestBlogQueryVariables>(GetLatestBlogDocument, options);
      }
export function useGetLatestBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestBlogQuery, GetLatestBlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLatestBlogQuery, GetLatestBlogQueryVariables>(GetLatestBlogDocument, options);
        }
export type GetLatestBlogQueryHookResult = ReturnType<typeof useGetLatestBlogQuery>;
export type GetLatestBlogLazyQueryHookResult = ReturnType<typeof useGetLatestBlogLazyQuery>;
export type GetLatestBlogQueryResult = Apollo.QueryResult<GetLatestBlogQuery, GetLatestBlogQueryVariables>;