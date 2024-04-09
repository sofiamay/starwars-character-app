import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { charactersApi } from "./apis/charactersApi";
import { planetsApi } from "./apis/planetsApi";
import { photosApi } from "./apis/photosApi";
import queryReducer from "./slices/querySlice";
import characterCountReducer from "./slices/characterCountSlice";

const rootReducer = combineReducers({
  query: queryReducer,
  characterCount: characterCountReducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
  [planetsApi.reducerPath]: planetsApi.reducer,
  [photosApi.reducerPath]: photosApi.reducer,
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
    characterCount: characterCountReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
    [planetsApi.reducerPath]: planetsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(charactersApi.middleware)
      .concat(planetsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./slices/querySlice";
export * from "./slices/characterCountSlice";
export {
  useGetCharactersByPageQuery,
  useGetCharacterQuery,
  useSearchCharactersQuery,
} from "./apis/charactersApi";
export { useGetPlanetQuery } from "./apis/planetsApi";
export { useSearchPhotosQuery } from "./apis/photosApi";

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
