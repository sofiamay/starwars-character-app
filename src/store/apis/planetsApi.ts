import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Planet } from "../../types";

/* based on the SWAPI schema https://swapi.tech/documentation#planets */

const planetsApi = createApi({
  reducerPath: "planets",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.swapi.tech/api/planets",
  }),
  tagTypes: ["Planet"],
  endpoints(builder) {
    return {
      getPlanet: builder.query({
        providesTags: (result, error, uid) => {
          const planet: Planet = result.result ? result.result : {};
          let planetId;
          if ("uid" in planet) {
            planetId = planet.uid;
          } else {
            planetId = -1;
          }
          return [{ type: "Planet", uid: planetId | -1 }];
        },
        query: (uid) => {
          return {
            url: `/${uid}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetPlanetQuery } = planetsApi;
export { planetsApi };
