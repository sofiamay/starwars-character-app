import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SwapiCharactersResult, SwapiCharacter } from "../../types";

/* based on the SWAPI schema https://swapi.tech/documentation#people */
interface SearchCharactersParams {
  name: string;
}

const charactersApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.swapi.tech/api",
  }),
  tagTypes: [
    "CharacterResult",
    "CharacterSearchResult",
    "AllCharactersOnPage",
    "Character",
  ],
  endpoints(builder) {
    return {
      getCharactersByPage: builder.query({
        providesTags: (result, error, page) => {
          const tags = result.results.map(
            (character: SwapiCharactersResult) => {
              return { type: "CharacterResult", id: character.uid };
            }
          );
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

      getCharacter: builder.query({
        providesTags: (result, error, uid) => {
          const character = result.result;
          return [{ type: "Character", uid: character.uid }];
        },
        query: (uid) => {
          return {
            url: `/people/${uid}`,
            method: "GET",
          };
        },
      }),

      searchCharacters: builder.query({
        providesTags: (result, error, params: SearchCharactersParams) => {
          const tags = result.result.map((character: SwapiCharacter) => {
            return { type: "Character", id: character.uid };
          });
          tags.push({ type: "CharacterSearchResult", params: params });
          return tags;
        },
        query: (params: SearchCharactersParams) => {
          return {
            url: `/people/`,
            params: { ...params },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useGetCharactersByPageQuery,
  useGetCharacterQuery,
  useSearchCharactersQuery,
} = charactersApi;
export { charactersApi };
