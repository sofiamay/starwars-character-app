import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UnsplashPhoto } from "../../types";

const UNSPLASH_AUTH: string = process.env.UNSPLASH_CREDENTIALS
  ? `Client-ID ${process.env.UNSPLASH_CREDENTIALS}`
  : "";

/* based on the Unsplash schema https://unsplash.com/documentatio */

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.unsplash.com/search",
  }),
  tagTypes: ["Photo", "PhotoSearchResult"],
  endpoints(builder) {
    return {
      searchPhotos: builder.query({
        providesTags: (result, error, searchQuery: string) => {
          const tags = result.result.map((photo: UnsplashPhoto) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "PhotoSearchResult", searchQuery: searchQuery });
          return tags;
        },
        query: (searchQuery: string) => {
          return {
            url: `/photos`,
            headers: {
              Authorization: UNSPLASH_AUTH,
            },
            params: {
              query: searchQuery,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useSearchPhotosQuery } = photosApi;
export { photosApi };
