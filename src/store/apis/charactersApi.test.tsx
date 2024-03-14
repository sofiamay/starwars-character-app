import { store } from '..';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import { useGetCharacterQuery } from "./charactersApi";

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

const data = {
  data: "successful"
}

beforeAll(() => {
  fetchMock.mockOnceIf('https://www.swapi.tech/api/people/1', () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify({ data }),
    })
  );
});

it('renders charactersAPI hook', async () => {
  const { result } = renderHook(() => useGetCharacterQuery(1), { wrapper: Wrapper });

  expect(result.current).toMatchObject({
    status: 'pending',
    endpointName: 'getCharacter',
    isLoading: true,
    isSuccess: false,
    isError: false,
    isFetching: true,
  });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  // expect(fetchMock).toBeCalledTimes(1);
});