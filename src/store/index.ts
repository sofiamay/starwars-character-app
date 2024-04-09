import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { charactersApi } from "./apis/charactersApi";
import { planetsApi } from "./apis/planetsApi";
import queryReducer from "./slices/querySlice";

const rootReducer = combineReducers({
  query: queryReducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
  [planetsApi.reducerPath]: planetsApi.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = configureStore({
  reducer: {
    query: queryReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
    [planetsApi.reducerPath]: planetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(charactersApi.middleware)
      .concat(planetsApi.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./slices/querySlice";
export {
  useGetCharactersByPageQuery,
  useGetCharacterQuery,
  useSearchCharactersQuery,
} from "./apis/charactersApi";
export { useGetPlanetQuery } from "./apis/planetsApi";

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
