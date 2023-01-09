import { useReducer } from 'react';

import { UiContext } from './UiContext';
import { uiReducer } from './uiReducer';

export interface UiState {
  isMenuOpen: boolean;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

export const UiProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({
      type: '[UI] - Toggle Menu',
    });
  };

  return (
    <UiContext.Provider value={{ ...state, toggleSideMenu }}>
      {children}
    </UiContext.Provider>
  );
};
