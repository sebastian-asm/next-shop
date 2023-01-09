import { UiState } from './UiProvider';

type UiActionType = { type: '[UI] - Toggle Menu' };

export const uiReducer = (state: UiState, action: UiActionType) => {
  switch (action.type) {
    case '[UI] - Toggle Menu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    default:
      return state;
  }
};
