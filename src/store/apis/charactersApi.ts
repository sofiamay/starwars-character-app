import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SwapiCharactersResult,
  SwapiCharacter,
  Character,
  SwapiSearchResult,
} from "../../types";
import { setCharacterCount } from "../slices/characterCountSlice";

/* based on the SWAPI schema https://swapi.tech/documentation#people */
export interface SearchCharactersParams {
  name: string;
}

const charactersApi = createApi({
  reducerPath: "characters",
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
          const tags = result.results?.map(
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
          const character: Character = result.result ? result.result : {};
          let characterId;
          if ("uid" in character) {
            characterId = character.uid;
          } else {
            characterId = -1;
          }
          return [{ type: "Character", uid: characterId | -1 }];
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
        async onQueryStarted(params, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            const searchResult: SwapiSearchResult = data;
            if (searchResult.total_records) {
              dispatch(setCharacterCount(searchResult.total_records));
            }
          } catch (err: any) {
            // to do
            if (err.hasOwnProperty("message")) console.log(err.message);
          }
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
