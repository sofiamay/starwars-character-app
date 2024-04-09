import { store } from '..';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import { useSearchPhotosQuery } from "./photosApi";

/* CONSTANTS */
const EXAMPLE_QUERY = "luke-skywalker";

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

const data = {
  data: "successful"
}

describe('Photos API Test', () => {
  beforeAll(() => {

    fetchMock.mockOnceIf(`https://api.unsplash.com/search/photos?query=${EXAMPLE_QUERY}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  /* TESTS */
  it('searchPhotos', async () => {
    const { result } = renderHook(() => useSearchPhotosQuery(EXAMPLE_QUERY), { wrapper: Wrapper });
  
    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'searchPhotos',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    // await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // expect(fetchMock).toBeCalledTimes(1);
  });

});

