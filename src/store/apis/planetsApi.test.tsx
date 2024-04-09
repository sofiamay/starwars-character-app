import { store } from '..';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import { useGetPlanetQuery } from "./planetsApi";

/* CONSTANTS */
const EXAMPLE_UID = 1;

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

const data = {
  data: "successful"
}

describe('Planets API Test', () => {
  beforeAll(() => {

    fetchMock.mockOnceIf(`https://www.swapi.tech/api/planets/${EXAMPLE_UID}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  /* TESTS */
  it('getPlanet', async () => {
    const { result } = renderHook(() => useGetPlanetQuery(EXAMPLE_UID), { wrapper: Wrapper });
  
    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'getPlanet',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    // await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // expect(fetchMock).toBeCalledTimes(1);
  });

});

