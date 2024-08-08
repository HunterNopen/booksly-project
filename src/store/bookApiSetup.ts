
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "../types/types";

interface ApiResponse {
  start: number;
  num_found: number;
  docs: Book[];
}

const baseUrl = "https://openlibrary.org/";



export const bookApi = createApi({
 reducerPath: "bookApi",
 baseQuery: fetchBaseQuery({ baseUrl }),
 endpoints: (builder) => ({
  getBookByTitle: builder.query<Book, string>({
    query: (name: string) => `search.json?title=${name}`,
  }),
  getBooksOnTrend: builder.query<Book[], void>({
    query: () => `search.json?q=random&limit=10&sort=rating`,
    transformResponse: (res: ApiResponse) => res.docs,
  }),
  getBookCover: builder.query<string, number>({
    query: (id: number) => `b/isbn/${id}-L.jpg`
  }),
  getRandom100Books: builder.query<Book[], void>({
    query: () => `search.json??q=random&limit=100`,
  }),
  getBookByAuthor: builder.query<{ docs: Book[] }, string>({
    query: (author) => `search.json?author=${author}`,
  }),
  getBookByYear: builder.query<{ docs: Book[] }, string>({
    query: (year) => `search.json?year=${year}`,
  }),
  getBookByName: builder.query<{ docs: Book[] }, string>({
    query: (title) => `search.json?title=${title}`,
  }),
})
});

export const { useGetBookByTitleQuery, useGetBooksOnTrendQuery, useGetBookCoverQuery,useLazyGetBookByNameQuery, useLazyGetBookByAuthorQuery, useLazyGetBookByYearQuery, useGetRandom100BooksQuery } = bookApi;