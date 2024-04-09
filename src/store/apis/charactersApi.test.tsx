import { store } from '..';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import { useGetCharactersByPageQuery, useGetCharacterQuery, useSearchCharactersQuery } from "./charactersApi";

/* CONSTANTS */
const EXAMPLE_UID = 1;
const EXAMPLE_PAGE = 1;

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

const data = {
  data: "successful"
}

describe('Characters API Test', () => {
  beforeAll(() => {

    fetchMock.mockOnceIf(`https://www.swapi.tech/api/people/${EXAMPLE_UID}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );

    fetchMock.mockOnceIf(`https://www.swapi.tech/api/people/?page=${EXAMPLE_PAGE}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );

    fetchMock.mockOnceIf(`https://www.swapi.tech/api/people/`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  /* TESTS */
  it('getCharactersByPage', async () => {
    const { result } = renderHook(() => useGetCharactersByPageQuery(EXAMPLE_PAGE), { wrapper: Wrapper });
  
    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'getCharactersByPage',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    // await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // expect(fetchMock).toBeCalledTimes(1);
  });

  it('getCharacter', async () => {
    const { result } = renderHook(() => useGetCharacterQuery(EXAMPLE_UID), { wrapper: Wrapper });
  
    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'getCharacter',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    // await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // expect(fetchMock).toBeCalledTimes(1);
  });

  it('searchCharacters', async () => {
    const { result } = renderHook(() => useSearchCharactersQuery({name: "luke"}), { wrapper: Wrapper });
  
    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'searchCharacters',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    // await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // expect(fetchMock).toBeCalledTimes(1);
  });
});

