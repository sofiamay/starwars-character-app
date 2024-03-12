import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const charactersApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints(builder) {
    return {
      getCharacters: builder.query({
        providesTags: (result, error, page) => {
          const tags = result.results.map((character) => {
            return { type: "Character", id: character.uid };
          });
          tags.push({ type: "AllCharactersOnPage", page: page });
          return tags;
        },
        query: (page) => {
          return {
            url: `/people/`,
            params: {
              page: page,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetCharactersQuery } = charactersApi;
export { charactersApi };
