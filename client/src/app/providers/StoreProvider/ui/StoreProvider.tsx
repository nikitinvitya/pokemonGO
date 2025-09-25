import React from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store/store';
import { StateSchema } from '../config/types/StateSchema';

interface StoreProviderProps {
  children?: React.ReactNode;
  initialState?: StateSchema;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState } = props;
  const store = createReduxStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
